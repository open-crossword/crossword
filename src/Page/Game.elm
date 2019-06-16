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
import View.Board as Board


type Model
    = Loaded
        { puzzle : Puzzle
        , board : Board
        }
    | Failed (List Parser.DeadEnd)


type Msg
    = OnDropFile File (List File)
    | OnFileRead String
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
    ( loadPuzzle (parsePuzzle SamplePuzzle.puzzle)
    , Task.attempt (\_ -> NoOp) (Browser.Dom.focus "game-grid")
    )


parsePuzzle : String -> Result (List Parser.DeadEnd) Puzzle
parsePuzzle input =
    Puzzle.Format.Xd.parse input


loadPuzzle : Result (List Parser.DeadEnd) Puzzle -> Model
loadPuzzle parsedPuzzle =
    case parsedPuzzle of
        Ok puzzle ->
            Loaded
                { puzzle = puzzle
                , board = Board.fromPuzzle puzzle
                }

        Err err ->
            Failed err


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onKeyDown (Decode.map OnKeyPress keyDecoder)



--- VIEW ---


view : Model -> { content : Html Msg, title : String }
view model =
    { title = "Game"
    , content =
        div
            [ hijackOn "drop" dropDecoder
            , hijackOn "dragover" (Decode.succeed NoOp)
            , class "avenir"
            ]
            [ case model of
                Loaded { puzzle, board } ->
                    viewCrossword puzzle board

                Failed err ->
                    pre [] [ text (Debug.toString err) ]
            ]
    }


viewCrossword : Puzzle -> Board -> Html Msg
viewCrossword puzzle board =
    div []
        [ div [ class "flex justify-center flex-column items-center" ]
            [ div [ class "w-90" ]
                [ viewMetadata puzzle.metadata
                , div [ css [ displayFlex ] ]
                    [ div [ class "w-50" ]
                        [ div [ css [ Styles.toolbar ] ]
                            [ viewToolbar
                            , viewSelectedClue puzzle board
                            ]
                        , div
                            [ css [ Css.margin (px 30), Css.marginTop (px 15) ] ]
                            [ Board.view
                                { clueIndicesVisible = True
                                , onCellClicked = OnCellClick
                                , board = board
                                , puzzle = puzzle
                                }
                            ]
                        ]
                    , div
                        [ css [ marginLeft (px 40) ]
                        , class "w-50"
                        ]
                        [ viewClues puzzle board ]
                    ]
                ]
            ]
        ]


viewMetadata : Metadata -> Html Msg
viewMetadata metadata =
    div
        [ css [ Css.marginLeft (px 30), Css.marginBottom (px 10) ] ]
        [ div
            []
            (case Maybe.andThen parseDateString metadata.date of
                Just { weekDay, englishMonth, dayNum, year } ->
                    [ h2 [ css [ Css.marginBottom (px 6) ] ] [ span [ class "fw7" ] [ text (weekDay ++ " ") ], span [ class "fw4" ] [ text (englishMonth ++ " " ++ dayNum ++ ", " ++ year) ] ] ]

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


viewToolbar : Html Msg
viewToolbar =
    let
        styles =
            class "button-reset fw5 mr2 bn-ns pa2 hover-hot-pink bg-animate bg-near-white hover-bg-white pointer link"
    in
    div [ class "flex justify-start mb2" ]
        [ button [ styles, onClick ResetPuzzle ] [ text "Reset Puzzle" ]
        , button [ styles, onClick RevealSelectedCell ] [ text "Reveal Square" ]
        , button [ styles, onClick RevealSelectedWord ] [ text "Reveal Word" ]
        , button [ styles, onClick RevealPuzzle ] [ text "Reveal Puzzle" ]
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
                backgroundColor (Css.hex Styles.selectedWordColor)

              else
                backgroundColor (rgb 255 255 255)
            ]
        , onClick (OnClueClick clue)
        ]
        [ viewIndex, span [] [ text (" " ++ clue.clue) ] ]


type KeyType
    = ArrowKey Grid.Direction
    | LetterKey Char
    | Delete
    | CycleSelectedClue
    | Other


keyDecoder : Decode.Decoder KeyType
keyDecoder =
    Decode.map keyCodeToKeyEvent (Decode.field "keyCode" Decode.int)


keyCodeToKeyEvent : Int -> KeyType
keyCodeToKeyEvent code =
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
            Delete

        _ ->
            if (64 <= code && code <= 90) || (code == 32) then
                LetterKey (Char.fromCode code)

            else if code == 9 || code == 13 then
                CycleSelectedClue

            else
                Other



--- UPDATE ---


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( OnDropFile file _, _ ) ->
            ( model, File.toString file |> Task.perform OnFileRead )

        ( OnFileRead content, _ ) ->
            ( loadPuzzle (parsePuzzle content), Cmd.none )

        ( OnCellClick point, Loaded record ) ->
            let
                oldSelection =
                    record.board.selection

                direction =
                    if oldSelection.cursor == point then
                        Direction.swap oldSelection.direction

                    else
                        oldSelection.direction

                newBoard =
                    Board.updateSelection point direction record.board
            in
            ( Loaded
                { record
                    | board = newBoard
                }
            , Cmd.none
            )

        ( OnCellClick _, _ ) ->
            ( model, Cmd.none )

        ( OnClueClick clue, Loaded record ) ->
            ( Loaded
                { record
                    | board = Board.moveSelectionToWord clue record.puzzle record.board
                }
            , Cmd.none
            )

        ( ResetPuzzle, Loaded record ) ->
            ( Loaded
                { record
                    | board = Board.fromPuzzle record.puzzle
                }
            , Cmd.none
            )

        ( RevealSelectedWord, Loaded record ) ->
            ( Loaded
                { record
                    | board = Board.revealSelectedWord record.puzzle record.board
                }
            , Cmd.none
            )

        ( RevealSelectedCell, Loaded record ) ->
            ( Loaded
                { record
                    | board = Board.revealSelectedCell record.puzzle record.board
                }
            , Cmd.none
            )

        ( RevealPuzzle, Loaded record ) ->
            ( Loaded
                { record
                    | board = Board.revealPuzzle record.puzzle record.board
                }
            , Cmd.none
            )

        ( OnKeyPress Delete, Loaded record ) ->
            let
                board =
                    record.board

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
            ( Loaded
                { record
                    | board = newBoard
                }
            , Cmd.none
            )

        ( OnKeyPress (LetterKey char), Loaded record ) ->
            let
                board =
                    record.board

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
            ( Loaded
                { record
                    | board = newBoard
                }
            , Cmd.none
            )

        ( OnKeyPress CycleSelectedClue, Loaded record ) ->
            ( Loaded
                { record
                    | board = Board.cycleSelectedClue record.puzzle record.board
                }
            , Cmd.none
            )

        -- TODO We just want this case to pattern match on arrow keys
        ( OnKeyPress (ArrowKey direction), Loaded record ) ->
            let
                selection =
                    record.board.selection

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
                        Board.updateSelection selection.cursor newDirection record.board

                    else
                        Board.moveSelectionSkip direction record.board
            in
            ( Loaded
                { record
                    | board = newBoard
                }
            , Cmd.none
            )

        ( _, _ ) ->
            ( model, Cmd.none )



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
