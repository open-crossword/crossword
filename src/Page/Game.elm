module Page.Game exposing (Model, Msg, init, subscriptions, update, view)

import Browser
import Browser.Dom
import Browser.Events
import Calendar
import Css exposing (absolute, alignItems, backgroundColor, border3, center, displayFlex, fontSize, left, margin, marginLeft, marginTop, position, property, px, relative, rgb, solid, top)
import Data.Board as Board exposing (Board)
import Data.Direction as Direction
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo as OneOrTwo exposing (OneOrTwo(..))
import Data.Point as Point exposing (Point)
import Data.Puzzle as Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle)
import Data.TimeFormat as TimeFormat
import DateTime
import Dict exposing (Dict)
import File exposing (File)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick, preventDefaultOn)
import Json.Decode as Decode
import List.Extra as List
import Maybe.Extra as Maybe
import Parser
import Puzzle.Format.Xd
import SamplePuzzle
import Session exposing (Session)
import Styles
import Svg.Styled as Svg exposing (Svg)
import Svg.Styled.Attributes as SvgA
import Svg.Styled.Events as SvgE
import Task
import Time
import UndoList exposing (UndoList)
import View.Board as Board


type alias InitializedState =
    { puzzle : Puzzle
    }


type alias InProgressState =
    { puzzle : Puzzle
    , board : Board
    , undoList : UndoList Board
    , timeSeconds : Int
    }


type alias EndedState =
    { puzzle : Puzzle
    , board : Board
    , timeSeconds : Int
    }


type Game
    = Initialized InitializedState
    | InProgress InProgressState
    | Ended EndedState


type alias Model =
    { game : Result (List Parser.DeadEnd) Game
    }


type Msg
    = OnDropFile File (List File)
    | OnFileRead String
    | OnGameStart
    | TimerTick
    | OnCellClick Point
    | OnKeyPress KeyType
    | OnClueClick Clue
    | ResetPuzzle
    | RevealPuzzle
    | RevealSelectedWord
    | RevealSelectedCell
    | NoOp


init : Session -> ( Model, Cmd Msg )
init session =
    ( { game = loadPuzzle SamplePuzzle.puzzle
      }
    , Task.attempt (\_ -> NoOp) (Browser.Dom.focus "game-grid")
    )


loadPuzzle : String -> Result (List Parser.DeadEnd) Game
loadPuzzle =
    parsePuzzle >> Result.map (InitializedState >> Initialized)


parsePuzzle : String -> Result (List Parser.DeadEnd) Puzzle
parsePuzzle input =
    Puzzle.Format.Xd.parse input



--- VIEW ---


view : Model -> { content : Html Msg, title : String }
view model =
    { title = "Game"
    , content =
        div
            [ hijackOn "drop" dropDecoder
            , hijackOn "dragover" (Decode.succeed NoOp)
            , css [ Styles.fonts.avenir ]
            ]
            [ case model.game of
                Ok game ->
                    viewGame game

                Err err ->
                    viewPuzzleError err
            ]
    }


viewGame : Game -> Html Msg
viewGame game =
    case game of
        Initialized gameState ->
            viewGameStart gameState

        InProgress gameState ->
            viewCrossword gameState

        Ended gameState ->
            viewCrossword gameState


viewPuzzleError : List Parser.DeadEnd -> Html Msg
viewPuzzleError errors =
    div
        [ class "flex flex-column"
        , css
            [ Css.padding (px 15) ]
        ]
        [ h2 [] [ text "Oh No!" ]
        , div [] [ text "There was an error loading your puzzle." ]
        ]


viewGameStart : { puzzle : Puzzle } -> Html Msg
viewGameStart gameState =
    div [ class "flex justify-center flex-column items-center" ]
        [ div [ class "w-70" ]
            [ viewMetadata gameState.puzzle.metadata
            , ourButton
                [ onClick OnGameStart
                , css
                    [ Css.padding (px 20)
                    , Css.marginTop (px 16)
                    ]
                ]
                [ text "Begin" ]
            ]
        ]


viewCrossword : { a | board : Board, puzzle : Puzzle, timeSeconds : Int } -> Html Msg
viewCrossword gameState =
    div [ class "flex justify-center flex-column items-center" ]
        [ div [ class "w-70" ]
            [ div [ css [ Styles.hideOnMobile ] ]
                [ viewMetadata gameState.puzzle.metadata
                , text (TimeFormat.formatSeconds gameState.timeSeconds)
                ]
            , div [ css [ Styles.toolbar ] ]
                [ viewToolbar ]
            , div [ css [ displayFlex, Css.justifyContent Css.center ] ]
                [ div [ class "w-100" ]
                    [ viewSelectedClue gameState.puzzle gameState.board
                    , div
                        [ css [ Css.marginTop (px 15) ] ]
                        [ Board.view
                            { clueIndicesVisible = True
                            , onCellClicked = OnCellClick
                            , board = gameState.board
                            , puzzle = gameState.puzzle
                            }
                        ]
                    , div [ class "flex justify-around mt2" ]
                        [ ourButton [ onClick (OnKeyPress UndoKey) ] [ text "undo" ]
                        , ourButton [ onClick (OnKeyPress RedoKey) ] [ text "redo" ]
                        ]
                    ]
                , div
                    [ css
                        [ marginLeft (px 40)
                        , Styles.hideOnMobile
                        ]
                    , class "w-100"
                    ]
                    [ viewClues gameState.puzzle gameState.board ]
                ]
            ]
        ]


viewMetadata : Metadata -> Html Msg
viewMetadata metadata =
    div
        []
        [ div
            []
            (case Maybe.andThen parseDateString metadata.date of
                Just { weekDay, englishMonth, dayNum, year } ->
                    [ h2 [ css [ Css.marginBottom (px 6) ] ]
                        [ span [ class "fw7" ] [ text (weekDay ++ " ") ]
                        , span [ class "fw4" ] [ text (englishMonth ++ " " ++ dayNum ++ ", " ++ year) ]
                        ]
                    ]

                Nothing ->
                    [ h2 [] [ text "Puzzle" ] ]
            )
        , div []
            [ span [] [ text "By " ]
            , b [] [ text (Maybe.withDefault "Unknown" metadata.author) ]
            , span [ css [ Css.paddingLeft (px 15) ] ] [ text "Edited by " ]
            , b [] [ text (Maybe.withDefault "Unknown" metadata.editor) ]
            ]
        ]


viewToolbar : Html Msg
viewToolbar =
    div [ class "flex justify-start mb2" ]
        [ ourButton [ onClick ResetPuzzle ] [ text "Reset Puzzle" ]
        , ourButton [ onClick RevealSelectedCell ] [ text "Reveal Square" ]
        , ourButton [ onClick RevealSelectedWord ] [ text "Reveal Word" ]
        , ourButton [ onClick RevealPuzzle ] [ text "Reveal Puzzle" ]
        ]


viewSelectedClue : Puzzle -> Board -> Html Msg
viewSelectedClue puzzle board =
    let
        selectedClue =
            Board.selectedClue puzzle board

        ( clueNumber, clueText ) =
            case selectedClue of
                Just clue ->
                    ( Puzzle.clueIdToDisplayString clue.id, clue.clue )

                Nothing ->
                    ( "", "" )
    in
    div [ css [ Styles.boardClue ] ] [ b [] [ text clueNumber ], text (" " ++ clueText) ]


viewClues : Puzzle -> Board -> Html Msg
viewClues puzzle board =
    let
        isAcross _ clue =
            case clue.id.direction of
                Direction.Across ->
                    True

                _ ->
                    False

        ( acrossClues, downClues ) =
            Dict.partition isAcross puzzle.clues

        selectedClue =
            Board.selectedClueId puzzle board

        helper =
            Dict.values >> List.sortBy (.id >> .number) >> List.map (viewClue selectedClue)
    in
    div [ css [ displayFlex ] ]
        [ div [ class "w-100" ]
            [ h2 [] [ text "Across" ]
            , div [] (helper acrossClues)
            ]
        , div [ class "w-100", css [ marginLeft (px 20) ] ]
            [ h2 [] [ text "Down" ]
            , div [] (helper downClues)
            ]
        ]


viewClue : Maybe ClueId -> Clue -> Html Msg
viewClue selectedClue clue =
    let
        viewIndex =
            b [] [ text (String.fromInt clue.id.number) ]

        isSelected =
            case selectedClue of
                Nothing ->
                    False

                Just clueId ->
                    clue.id == clueId
    in
    div
        [ css
            [ Styles.clue
            , if isSelected then
                backgroundColor Styles.colors.selectedWord

              else
                backgroundColor (rgb 255 255 255)
            ]
        , onClick (OnClueClick clue)
        ]
        [ viewIndex, span [] [ text (" " ++ clue.clue) ] ]


ourButton attrs children =
    -- TODO: remove tachyons, clean this up
    let
        styles =
            class "button-reset fw5 mr2 bn-ns pa2 hover-hot-pink bg-animate hover-bg-white pointer link"
    in
    button
        (attrs
            ++ [ styles
               , css
                    [ Css.backgroundColor Styles.colors.lightGrey
                    ]
               ]
        )
        children



--- UPDATE ---


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model.game ) of
        ( OnDropFile file _, _ ) ->
            ( model, File.toString file |> Task.perform OnFileRead )

        ( OnFileRead content, _ ) ->
            ( Model (loadPuzzle content), Cmd.none )

        ( _, Err err ) ->
            ( model, Cmd.none )

        ( _, Ok game ) ->
            ( { model | game = Ok (updateGameState msg game) }, Cmd.none )


updateGameState : Msg -> Game -> Game
updateGameState msg gameState =
    case gameState of
        Initialized initializedGame ->
            updateInitializedGame msg initializedGame

        InProgress inProgressGame ->
            updateInProgressGame msg inProgressGame

        Ended endedState ->
            -- TODO
            gameState

updateInitializedGame : Msg -> InitializedState -> Game
updateInitializedGame msg state =
    case msg of
        OnGameStart ->
            freshInProgress state.puzzle

        _ ->
            Initialized state


updateInProgressGame : Msg -> InProgressState -> Game
updateInProgressGame msg gameState =
    let
        noOp =
            InProgress gameState

        updateBoard game board =
            InProgress { game | board = board, undoList = UndoList.new board game.undoList }
    in
    case msg of
        TimerTick ->
            let
                newTime =
                    gameState.timeSeconds + 1
            in
            InProgress { gameState | timeSeconds = newTime }

        OnCellClick point ->
            let
                oldSelection =
                    gameState.board.selection

                direction =
                    if oldSelection.cursor == point then
                        Direction.swap oldSelection.direction

                    else
                        oldSelection.direction

                newBoard =
                    Board.updateSelection point direction gameState.board
            in
            updateBoard gameState newBoard

        OnClueClick clue ->
            updateBoard gameState (Board.moveSelectionToWord clue gameState.puzzle gameState.board)

        ResetPuzzle ->
            let
                newBoard =
                    Board.fromPuzzle gameState.puzzle
            in
            freshInProgress gameState.puzzle

        RevealSelectedWord ->
            updateBoard gameState (Board.revealSelectedWord gameState.puzzle gameState.board)

        RevealSelectedCell ->
            updateBoard gameState (Board.revealSelectedCell gameState.puzzle gameState.board)

        RevealPuzzle ->
            updateBoard gameState (Board.revealPuzzle gameState.puzzle gameState.board)

        OnKeyPress DeleteKey ->
            let
                board =
                    gameState.board

                cursor =
                    board.selection.cursor

                direction =
                    case board.selection.direction of
                        Direction.Across ->
                            Grid.Left

                        Direction.Down ->
                            Grid.Up

                newBoard =
                    { board | grid = Grid.set cursor (Letter ' ') board.grid }
                        |> Board.moveSelection direction
            in
            updateBoard gameState newBoard

        OnKeyPress (LetterKey char) ->
            let
                board =
                    gameState.board

                cursor =
                    board.selection.cursor

                direction =
                    case board.selection.direction of
                        Direction.Across ->
                            Grid.Right

                        Direction.Down ->
                            Grid.Down

                newBoard =
                    { board | grid = Grid.set cursor (Letter char) board.grid }
                        |> Board.moveSelection direction
            in
            updateBoard gameState newBoard

        OnKeyPress CycleSelectedClueKey ->
            let
                newBoard =
                    Board.cycleSelectedClue gameState.puzzle gameState.board
            in
            updateBoard gameState newBoard

        -- TODO We just want this case to pattern match on arrow keys
        OnKeyPress (ArrowKey direction) ->
            let
                selection =
                    gameState.board.selection

                isChangingDirection =
                    (selection.direction == Direction.Across && (direction == Grid.Up || direction == Grid.Down))
                        || (selection.direction == Direction.Down && (direction == Grid.Left || direction == Grid.Right))

                newDirection =
                    if isChangingDirection then
                        Direction.swap selection.direction

                    else
                        selection.direction

                newBoard =
                    if isChangingDirection then
                        Board.updateSelection selection.cursor newDirection gameState.board

                    else
                        Board.moveSelectionSkip direction gameState.board
            in
            updateBoard gameState newBoard

        OnKeyPress UndoKey ->
            let
                undoList =
                    UndoList.undo gameState.undoList
            in
            InProgress
                { gameState
                    | undoList = undoList
                    , board = undoList.present
                }

        OnKeyPress RedoKey ->
            let
                undoList =
                    UndoList.redo gameState.undoList
            in
            InProgress
                { gameState
                    | undoList = undoList
                    , board = undoList.present
                }

        OnKeyPress OtherKey ->
            noOp

        OnDropFile file _ ->
            noOp

        OnFileRead content ->
            noOp

        NoOp ->
            noOp

        OnGameStart ->
            noOp



freshInProgress : Puzzle -> Game
freshInProgress puzzle =
    let
        freshBoard =
            Board.fromPuzzle puzzle
    in
    InProgress
        { puzzle = puzzle
        , board = freshBoard
        , undoList = UndoList.fresh freshBoard
        , timeSeconds = 0
        }



--- SUBSCRIPTIONS ---


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.game of
        Ok (InProgress _) ->
            Sub.batch
                [ Browser.Events.onKeyDown (Decode.map OnKeyPress keyDecoder)
                , Time.every 1000 (always TimerTick)
                ]

        _ ->
            Sub.none



--- UTILS ---


dropDecoder : Decode.Decoder Msg
dropDecoder =
    Decode.at [ "dataTransfer", "files" ] (Decode.oneOrMore OnDropFile File.decoder)


hijackOn : String -> Decode.Decoder msg -> Attribute msg
hijackOn event decoder =
    preventDefaultOn event (Decode.map hijack decoder)


hijack : msg -> ( msg, Bool )
hijack msg =
    ( msg, True )


type KeyType
    = ArrowKey Grid.Direction
    | LetterKey Char
    | DeleteKey
    | CycleSelectedClueKey
    | UndoKey
    | RedoKey
    | OtherKey


keyDecoder : Decode.Decoder KeyType
keyDecoder =
    Decode.map3 keyCodeToKeyEvent
        (Decode.field "keyCode" Decode.int)
        (Decode.field "metaKey" Decode.bool)
        (Decode.field "shiftKey" Decode.bool)


keyCodeToKeyEvent : Int -> Bool -> Bool -> KeyType
keyCodeToKeyEvent code meta shiftKey =
    case code of
        37 ->
            ArrowKey Grid.Left

        39 ->
            ArrowKey Grid.Right

        38 ->
            ArrowKey Grid.Up

        40 ->
            ArrowKey Grid.Down

        8 ->
            DeleteKey

        _ ->
            if meta && code == 90 then
                if shiftKey then
                    RedoKey

                else
                    UndoKey

            else if (64 <= code && code <= 90) || (code == 32) then
                LetterKey (Char.fromCode code)

            else if code == 9 || code == 13 then
                CycleSelectedClueKey

            else
                OtherKey


intToMonth : Int -> Maybe Time.Month
intToMonth int =
    case int of
        1 ->
            Just Time.Jan

        2 ->
            Just Time.Feb

        3 ->
            Just Time.Mar

        4 ->
            Just Time.Apr

        5 ->
            Just Time.May

        6 ->
            Just Time.Jun

        7 ->
            Just Time.Jul

        8 ->
            Just Time.Aug

        9 ->
            Just Time.Sep

        10 ->
            Just Time.Oct

        11 ->
            Just Time.Nov

        12 ->
            Just Time.Dec

        _ ->
            Nothing


toEnglishWeekday : Time.Weekday -> String
toEnglishWeekday weekday =
    case weekday of
        Time.Mon ->
            "Monday"

        Time.Tue ->
            "Tuesday"

        Time.Wed ->
            "Wednesday"

        Time.Thu ->
            "Thursday"

        Time.Fri ->
            "Friday"

        Time.Sat ->
            "Saturday"

        Time.Sun ->
            "Sunday"


toEnglishMonth : Time.Month -> String
toEnglishMonth month =
    case month of
        Time.Jan ->
            "January"

        Time.Feb ->
            "Feburary"

        Time.Mar ->
            "March"

        Time.Apr ->
            "April"

        Time.May ->
            "May"

        Time.Jun ->
            "June"

        Time.Jul ->
            "July"

        Time.Aug ->
            "August"

        Time.Sep ->
            "September"

        Time.Oct ->
            "October"

        Time.Nov ->
            "November"

        Time.Dec ->
            "December"


dateFromYearMonthDay : Int -> Int -> Int -> Maybe Calendar.Date
dateFromYearMonthDay yearInt monthInt dayInt =
    intToMonth monthInt
        |> Maybe.andThen
            (\month ->
                Calendar.fromRawParts (Calendar.RawDate yearInt month dayInt)
            )


parseDateString : String -> Maybe { weekDay : String, englishMonth : String, dayNum : String, year : String }
parseDateString dateString =
    let
        listToTriple : List a -> Maybe ( a, a, a )
        listToTriple ls =
            case ls of
                [ yearInt, monthInt, dayInt ] ->
                    Just ( yearInt, monthInt, dayInt )

                _ ->
                    Nothing

        tupleAp3 : (a -> b -> c -> d) -> ( a, b, c ) -> d
        tupleAp3 fn ( a, b, c ) =
            fn a b c
    in
    String.split "-" dateString
        |> Maybe.traverse String.toInt
        |> Maybe.andThen listToTriple
        |> Maybe.andThen (tupleAp3 dateFromYearMonthDay)
        |> Maybe.map
            (\date ->
                { weekDay = toEnglishWeekday (Calendar.getWeekday date)
                , englishMonth = toEnglishMonth (Calendar.getMonth date)
                , dayNum = String.fromInt (Calendar.getDay date)
                , year = String.fromInt (Calendar.getYear date)
                }
            )
