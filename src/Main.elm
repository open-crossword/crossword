module Main exposing (main)

import Browser
import Css exposing (absolute, alignItems, backgroundColor, border3, center, displayFlex, fontSize, left, margin, marginLeft, marginTop, position, property, px, relative, rgb, solid, top)
import Data.Board as Board exposing (Board)
import Data.Direction exposing (Direction(..), swap)
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo as OneOrTwo exposing (OneOrTwo(..))
import Data.Puzzle as Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle)
import Dict exposing (Dict)
import File exposing (File)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick, preventDefaultOn)
import Json.Decode as Decode
import List.Extra
import Parser
import Puzzle
import SamplePuzzle
import Task


type Model
    = Loaded
        { puzzle : Puzzle
        , board : Board
        }
    | Failed (List Parser.DeadEnd)


type Msg
    = OnDropFile File (List File)
    | OnFileRead String
    | OnCellClick Int Int
    | NoOp


init : ( Model, Cmd Msg )
init =
    ( loadPuzzle (Puzzle.parse SamplePuzzle.puzzle)
    , Cmd.none
    )


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


main : Program () Model Msg
main =
    Browser.element
        { init = always init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = always Sub.none
        }



--- VIEW ---


view : Model -> Html Msg
view model =
    div
        [ hijackOn "drop" dropDecoder
        , hijackOn "dragover" (Decode.succeed NoOp)
        ]
        [ case model of
            Loaded { puzzle, board } ->
                viewCrossword puzzle board

            Failed err ->
                pre [] [ text (Debug.toString err) ]
        ]


viewCrossword : Puzzle -> Board -> Html Msg
viewCrossword puzzle board =
    div []
        [ viewMetadata puzzle.metadata
        , hr [] []
        , div [ css [ displayFlex ] ]
            [ div [ css [ marginTop (px 71) ] ] [ viewBoard puzzle board ]
            , div [ css [ marginLeft (px 40) ] ] [ viewClues puzzle board ]
            ]
        ]


viewMetadata : Metadata -> Html Msg
viewMetadata metadata =
    div []
        [ div [] [ text ("Title: " ++ Maybe.withDefault "" metadata.title) ]
        , div [] [ text ("Author: " ++ Maybe.withDefault "" metadata.author) ]
        , div [] [ text ("Editor: " ++ Maybe.withDefault "" metadata.editor) ]
        , div [] [ text ("Date: " ++ Maybe.withDefault "" metadata.date) ]
        ]


viewBoard : Puzzle -> Board -> Html Msg
viewBoard puzzle board =
    div
        []
        (board.grid
            |> Grid.to2DList
            -- this could probably be part of Grid.to2DList (to2DListNonEmpty?)
            |> List.map (List.filterMap identity)
            |> List.indexedMap (viewRow puzzle board)
        )


viewRow : Puzzle -> Board -> Int -> List Cell -> Html Msg
viewRow puzzle board y row =
    pre
        [ css [ rowStyle ]
        ]
        (List.indexedMap (viewCell puzzle board y) row)


viewCell : Puzzle -> Board -> Int -> Int -> Cell -> Html Msg
viewCell puzzle board y x cell =
    let
        isSelected =
            board.selection.x == x && board.selection.y == y

        selectedClue : Maybe ClueId
        selectedClue =
            Puzzle.getSelectedClueId puzzle board.selection

        isSelectedWord : Maybe ClueId -> Bool
        isSelectedWord selectedClueId =
            case Dict.get (Grid.pointToIndex ( x, y ) puzzle.grid) puzzle.cluesForCell of
                Just (One id) ->
                    Maybe.map (\clue -> clue == id) selectedClueId |> Maybe.withDefault False

                Just (Two id1 id2) ->
                    Maybe.map (\clue -> clue == id1 || clue == id2) selectedClueId |> Maybe.withDefault False

                Nothing ->
                    False

        isWordStart =
            List.Extra.find (\ws -> ws.point == ( x, y )) puzzle.wordStarts
                |> Maybe.map .direction

        wordStartNumber =
            List.Extra.find (\ws -> ws.point == ( x, y )) puzzle.wordStarts
                |> Maybe.map .clueNumber
    in
    case cell of
        Letter char ->
            div
                [ css
                    [ cellStyle
                    , if isSelected then
                        selectedCellStyle

                      else if isSelectedWord selectedClue then
                        selectedWordCellStyle

                      else
                        cellStyle
                    ]
                , onClick (OnCellClick y x)
                ]
                [ text (String.fromChar char)
                , div [ css [ cellIdStyle ] ]
                    -- TODO Dict.get (Grid.pointToIndex ( x, y ) puzzle.grid) puzzle.cluesForCell
                    [ case wordStartNumber of
                        Just n ->
                            viewCellClueIndex n

                        Nothing ->
                            div [] []
                    ]
                ]

        Shaded ->
            b [ css [ cellStyle, shadedCellStyle ] ] [ text "" ]


viewCellClueIndex : Int -> Html Msg
viewCellClueIndex number =
    span [] [ text (String.fromInt number) ]


viewClues : Puzzle -> Board -> Html Msg
viewClues puzzle board =
    let
        isAcross _ clue =
            case clue.id.direction of
                Across ->
                    True

                _ ->
                    False

        ( acrossClues, downClues ) =
            Dict.partition isAcross puzzle.clues

        selectedClue =
            Puzzle.getSelectedClueId puzzle board.selection

        helper =
            Dict.values >> List.sortBy (.id >> .number) >> List.map (viewClue selectedClue)
    in
    div [ css [ displayFlex ] ]
        [ div []
            [ h2 [] [ text "Across" ]
            , div [] (helper acrossClues)
            ]
        , div [ css [ marginLeft (px 20) ] ]
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
            [ if isSelected then
                backgroundColor selectedWordColor

              else
                backgroundColor (rgb 255 255 255)
            ]
        ]
        [ viewIndex, span [] [ text (" " ++ clue.clue) ] ]



--- UPDATE ---


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( OnDropFile file _, _ ) ->
            ( model, File.toString file |> Task.perform OnFileRead )

        ( OnFileRead content, _ ) ->
            ( loadPuzzle (Puzzle.parse content), Cmd.none )

        ( OnCellClick row col, Loaded record ) ->
            let
                oldSelection =
                    record.board.selection

                direction =
                    if col == oldSelection.x && row == oldSelection.y then
                        swap oldSelection.direction

                    else
                        oldSelection.direction

                newBoard =
                    Board.updateSelection ( col, row ) direction record.board
            in
            ( Loaded
                { record
                    | board = newBoard
                }
            , Cmd.none
            )

        ( OnCellClick _ _, _ ) ->
            ( model, Cmd.none )

        ( NoOp, _ ) ->
            ( model, Cmd.none )



--- STYLES ---


justifyContentCenter =
    Css.property "justify-content" "center"


black =
    rgb 0 0 0


selectedCursorColor =
    rgb 123 184 235


selectedWordColor =
    rgb 186 202 203


rowStyle =
    Css.batch [ displayFlex, margin (px 0) ]


cellStyle =
    Css.batch
        [ displayFlex
        , justifyContentCenter
        , border3 (px 1) solid black
        , Css.height (px 30)
        , Css.width (px 30)
        , alignItems center
        , fontSize (px 13)
        , position relative
        ]


cellIdStyle =
    Css.batch
        [ position absolute
        , top (px 1)
        , left (px 1)
        , fontSize (px 10)
        ]


shadedCellStyle =
    backgroundColor black


selectedCellStyle =
    backgroundColor selectedCursorColor


selectedWordCellStyle =
    backgroundColor selectedWordColor



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
