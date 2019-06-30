module Page.Game exposing (Model, Msg, init, subscriptions, update, view)

import Browser
import Browser.Dom
import Browser.Events
import Css exposing (absolute, alignItems, backgroundColor, border3, center, displayFlex, fontSize, int, left, margin, marginLeft, marginTop, position, property, px, relative, rem, rgb, solid, top)
import Data.Board as Board exposing (Board)
import Data.Direction as Direction
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo as OneOrTwo exposing (OneOrTwo(..))
import Data.Point as Point exposing (Point)
import Data.Puzzle as Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle)
import Data.Puzzle.Date as PuzzleDate
import Data.Puzzle.Id as PuzzleId exposing (PuzzleId)
import Data.TimeFormat as TimeFormat
import DateTime
import Dict exposing (Dict)
import File exposing (File)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick, preventDefaultOn)
import Http
import Http.Puzzle
import Json.Decode as Decode exposing (Decoder)
import List.Extra as List
import Parser exposing (Parser)
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
    = Loading
    | Initialized InitializedState
    | InProgress InProgressState
    | Ended EndedState
      -- TODO Capture error state (Http/Parser)
    | Error


type alias Model =
    { game : Game
    }


type Msg
    = OnDropFile File (List File)
    | OnFileRead { name : String, contents : String }
    | OnGameStart
    | TimerTick
    | OnCellClick Point
    | OnKeyPress KeyType
    | OnClueClick Clue
    | ResetPuzzle
    | RevealPuzzle
    | RevealSelectedWord
    | RevealSelectedCell
    | GotPuzzle PuzzleId (Result Http.Puzzle.Error Puzzle)
    | NoOp


init : Session -> Maybe PuzzleId -> ( Model, Cmd Msg )
init session puzzleId =
    ( { game =
            case puzzleId of
                Just _ ->
                    Loading

                Nothing ->
                    loadGame SamplePuzzle.id SamplePuzzle.puzzle
      }
    , Cmd.batch
        [ Task.attempt (\_ -> NoOp) (Browser.Dom.focus "game-grid")
        , case puzzleId of
            Just id ->
                Http.Puzzle.get (GotPuzzle id) id

            Nothing ->
                Cmd.none
        ]
    )


loadGame : PuzzleId -> String -> Game
loadGame id =
    parsePuzzle id
        >> Result.map (InitializedState >> Initialized)
        >> Result.withDefault Error


parsePuzzle : PuzzleId -> String -> Result (List Parser.DeadEnd) Puzzle
parsePuzzle id input =
    Puzzle.Format.Xd.parse id input



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
            [ viewGame model.game
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
            viewGameEnd gameState

        Loading ->
            div [] [ text "loading..." ]

        Error ->
            div [] [ text "Failed to load puzzle! " ]


viewPuzzleError : List Parser.DeadEnd -> Html Msg
viewPuzzleError errors =
    div
        [ css
            [ Css.displayFlex
            , Css.flexDirection Css.column
            , Css.padding (px 15)
            ]
        ]
        [ h2 [] [ text "Oh No!" ]
        , div [] [ text "There was an error loading your puzzle." ]
        ]


viewGameStart : { puzzle : Puzzle } -> Html Msg
viewGameStart gameState =
    div
        [ css
            [ Css.displayFlex
            , Css.flexDirection Css.column
            , Css.justifyContent Css.center
            , Css.alignItems Css.center
            ]
        ]
        [ div
            [ css
                [ Styles.isMobile
                    [ Styles.widths.p90 ]
                    [ Styles.widths.p70 ]
                ]
            ]
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


viewGameEnd : { a | board : Board, puzzle : Puzzle, timeSeconds : Int } -> Html Msg
viewGameEnd gameState =
    div []
        [ div
            [ css
                [ Css.displayFlex
                , Css.flexDirection Css.column
                , Css.justifyContent Css.center
                , Css.alignItems Css.center
                , Css.backgroundColor Styles.colors.lightGreen
                , Css.padding (px 16)
                ]
            ]
            [ text ("Puzzle completed in " ++ TimeFormat.formatSeconds gameState.timeSeconds ++ "!") ]
        , viewCrossword gameState
        ]


viewCrossword : { a | board : Board, puzzle : Puzzle, timeSeconds : Int } -> Html Msg
viewCrossword gameState =
    div
        [ css
            [ Css.displayFlex
            , Css.flexDirection Css.column
            , Css.justifyContent Css.center
            , Css.alignItems Css.center
            ]
        ]
        [ div
            [ css
                [ Styles.isMobile
                    [ Styles.widths.p90 ]
                    [ Styles.widths.p70 ]
                ]
            ]
            [ div [ css [ Styles.hideOnMobile ] ]
                [ viewMetadata gameState.puzzle.metadata
                , text (TimeFormat.formatSeconds gameState.timeSeconds)
                ]
            , div [ css [ Styles.toolbar ] ]
                [ viewToolbar ]
            , div [ css [ displayFlex, Css.justifyContent Css.center ] ]
                [ div [ css [ Styles.widths.p100 ] ]
                    [ viewSelectedClue gameState.puzzle gameState.board
                    , div
                        [ css [ Css.marginTop (px 15) ] ]
                        [ Board.view
                            { clueIndicesVisible = True
                            , selectionVisible = True
                            , onCellClicked = OnCellClick
                            , board = gameState.board
                            , puzzle = gameState.puzzle
                            }
                        ]
                    , div
                        [ css
                            [ Css.displayFlex
                            , Css.justifyContent Css.spaceAround
                            , Css.marginTop (rem 0.5)
                            ]
                        ]
                        [ ourButton [ onClick (OnKeyPress UndoKey) ] [ text "undo" ]
                        , ourButton [ onClick (OnKeyPress RedoKey) ] [ text "redo" ]
                        ]
                    ]
                , div
                    [ css
                        [ marginLeft (px 40)
                        , Styles.hideOnMobile
                        , Styles.widths.p100
                        ]
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
            (case Maybe.andThen PuzzleDate.parseDateString metadata.date of
                Just { weekDay, englishMonth, dayNum, year } ->
                    [ h2 [ css [ Css.marginBottom (px 6) ] ]
                        [ span
                            [ css
                                [ Css.fontWeight (int 700)
                                ]
                            ]
                            [ text (weekDay ++ " ") ]
                        , span
                            [ css
                                [ Css.fontWeight (int 400)
                                ]
                            ]
                            [ text (englishMonth ++ " " ++ dayNum ++ ", " ++ year) ]
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
    div
        [ css
            [ Css.displayFlex
            , Css.justifyContent Css.flexStart
            , Css.marginBottom (rem 0.5)
            ]
        ]
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
        [ div
            [ css
                [ Styles.widths.p100
                ]
            ]
            [ h2 [] [ text "Across" ]
            , div [] (helper acrossClues)
            ]
        , div
            [ css
                [ marginLeft (px 20)
                , Styles.widths.p100
                ]
            ]
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
                backgroundColor Css.transparent
            ]
        , onClick (OnClueClick clue)
        ]
        [ viewIndex, span [] [ text (" " ++ clue.clue) ] ]


ourButton attrs children =
    button
        (attrs
            ++ [ css
                    [ Css.backgroundColor Styles.colors.lightGrey
                    ]
               ]
        )
        children



--- UPDATE ---


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        onFileRead file contents =
            OnFileRead
                { contents = contents
                , name = File.name file
                }
    in
    case ( msg, model.game ) of
        ( OnDropFile file _, _ ) ->
            ( model
            , File.toString file
                |> Task.perform (onFileRead file)
            )

        ( OnFileRead { contents, name }, _ ) ->
            ( Model (loadGame (PuzzleId.fromString name) contents), Cmd.none )

        ( GotPuzzle id (Ok puzzle), _ ) ->
            ( Model <| Initialized <| InitializedState puzzle, Cmd.none )

        ( GotPuzzle id (Err p), _ ) ->
            ( model, Cmd.none )

        ( _, game ) ->
            ( { model | game = updateGameState msg game }, Cmd.none )


updateGameState : Msg -> Game -> Game
updateGameState msg gameState =
    case gameState of
        Initialized initializedGame ->
            updateInitializedGame msg initializedGame

        InProgress inProgressGame ->
            updateInProgressGame msg inProgressGame

        Loading ->
            gameState

        Ended endedState ->
            -- TODO
            gameState

        Error ->
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

        updateBoard : InProgressState -> Board -> Game
        updateBoard game board =
            let
                isPuzzleCorrect =
                    Grid.equals board.grid game.puzzle.grid
            in
            if isPuzzleCorrect then
                Ended
                    { puzzle = game.puzzle
                    , board = board
                    , timeSeconds = game.timeSeconds
                    }

            else
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

        GotPuzzle _ _ ->
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
        InProgress _ ->
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
