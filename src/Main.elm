module Main exposing (main)

import Browser
import Css exposing (absolute, alignItems, backgroundColor, border3, center, displayFlex, fontSize, left, margin, marginLeft, marginTop, position, property, px, relative, rgb, solid, top)
import Data.Direction exposing (Direction(..), swap)
import Data.Grid as Grid exposing (Grid)
import File exposing (File)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick, preventDefaultOn)
import Json.Decode as Decode
import Parser
import Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle)
import SamplePuzzle
import Task


type Model
    = Loaded
        { puzzle : Puzzle
        , board : Board
        }
    | Failed (List Parser.DeadEnd)


type alias Board =
    { grid : AnnotatedGrid
    , selection : Selection
    }


type alias Selection =
    { x : Int
    , y : Int
    , direction : Direction
    }


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
                , board =
                    { -- Temporarily copy the puzzle solution into our game grid
                      grid = puzzle.grid
                    , selection =
                        { x = 0
                        , y = 0
                        , direction = Across
                        }
                    }
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
            [ div [ css [ marginTop (px 71) ] ] [ viewBoard board ]
            , div [ css [ marginLeft (px 40) ] ] [ viewClues puzzle.clues ]
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


viewBoard : Board -> Html Msg
viewBoard board =
    div
        []
        (board.grid
            |> Grid.to2DList
            -- this could probably be part of Grid.to2DList (to2DListNonEmpty?)
            |> List.map (List.filterMap identity)
            |> List.indexedMap (viewRow board.selection)
        )


viewRow : Selection -> Int -> List Cell -> Html Msg
viewRow selection rowIndex row =
    pre
        [ css [ rowStyle ]
        ]
        (List.indexedMap (viewCell selection rowIndex) row)


viewCell : Selection -> Int -> Int -> Cell -> Html Msg
viewCell selection rowIndex colIndex cell =
    let
        isSelected =
            selection.x == colIndex && selection.y == rowIndex

        isSelectedWord =
            (selection.direction == Down && selection.x == colIndex)
                || (selection.direction == Across && selection.y == rowIndex)
    in
    case cell of
        Letter x clueId ->
            div
                [ css
                    [ cellStyle
                    , if isSelected then
                        selectedCellStyle

                      else if isSelectedWord then
                        selectedWordCellStyle

                      else
                        cellStyle
                    ]
                , onClick (OnCellClick rowIndex colIndex)
                ]
                [ text (String.fromChar x)
                , div [ css [ cellIdStyle ] ]
                    [ text (Maybe.map (.number >> String.fromInt) clueId |> Maybe.withDefault "") ]
                ]

        Shaded ->
            b [ css [ cellStyle, shadedCellStyle ] ] [ text "" ]


viewClues : List Clue -> Html Msg
viewClues clues =
    let
        isAcross clue =
            case clue.id.direction of
                Across ->
                    True

                _ ->
                    False

        ( acrossClues, downClues ) =
            List.partition isAcross clues
    in
    div [ css [ displayFlex ] ]
        [ div []
            [ h2 [] [ text "Across" ]
            , div [] (List.map viewClue acrossClues)
            ]
        , div [ css [ marginLeft (px 20) ] ]
            [ h2 [] [ text "Down" ]
            , div [] (List.map viewClue downClues)
            ]
        ]


viewClue : Clue -> Html Msg
viewClue clue =
    div [] [ viewClueId clue.id, span [] [ text (" " ++ clue.clue) ] ]


viewClueId : ClueId -> Html Msg
viewClueId clueId =
    b []
        [ text
            (String.fromInt clueId.number)
        ]



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
                oldBoard =
                    record.board

                oldSelection =
                    oldBoard.selection

                swapDirection =
                    col == oldSelection.x && row == oldSelection.y

                newBoard =
                    { oldBoard
                        | selection =
                            { x = col
                            , y = row
                            , direction =
                                if swapDirection then
                                    swap oldSelection.direction

                                else
                                    oldSelection.direction
                            }
                    }
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
