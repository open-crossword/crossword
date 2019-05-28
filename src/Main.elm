module Main exposing (main)

import Browser
import Css exposing (alignItems, backgroundColor, border3, center, displayFlex, fontSize, margin, marginLeft, marginTop, property, px, rgb, solid)
import Data
import File exposing (File)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick, preventDefaultOn)
import Json.Decode as Decode
import Parser
import Puzzle exposing (Cell(..), Clue, Grid, Index(..), Metadata, Puzzle)
import Task


type Model
    = Loaded
        { puzzle : Puzzle
        , board : Board
        }
    | Failed (List Parser.DeadEnd)


type alias Board =
    { grid : Grid
    , selection : Selection
    }


type alias Selection =
    { x : Int
    , y : Int
    }


type Msg
    = OnDropFile File (List File)
    | OnFileRead String
    | OnCellClick Int Int
    | NoOp


init : ( Model, Cmd Msg )
init =
    ( loadPuzzle (Puzzle.parse Data.sampleData)
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
                    , selection = { x = 0, y = 0 }
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
        (List.indexedMap (viewRow board.selection) board.grid)


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
    in
    case cell of
        Letter x ->
            div
                [ css
                    [ cellStyle
                    , if isSelected then
                        selectedCellStyle

                      else
                        cellStyle
                    ]
                , onClick (OnCellClick rowIndex colIndex)
                ]
                [ text "" ]

        Shaded ->
            b [ css [ cellStyle, shadedCellStyle ] ] [ text "" ]


viewClues : List Clue -> Html Msg
viewClues clues =
    let
        isAcross clue =
            case clue.index of
                Across _ ->
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
    div [] [ viewIndex clue.index, span [] [ text (" " ++ clue.clue) ] ]


viewIndex : Index -> Html Msg
viewIndex index =
    b []
        [ text
            (case index of
                Across i ->
                    String.fromInt i

                Down i ->
                    String.fromInt i
            )
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

                newBoard =
                    { oldBoard
                        | selection =
                            { x = col
                            , y = row
                            }
                    }
            in
            ( Loaded
                { record
                    | board = newBoard
                }
            , Cmd.none
            )

        ( OnCellClick row col, _ ) ->
            ( model, Cmd.none )

        ( NoOp, _ ) ->
            ( model, Cmd.none )



--- STYLES ---


justifyContentCenter =
    Css.property "justify-content" "center"


black =
    rgb 0 0 0


red =
    rgb 255 0 0


rowStyle =
    Css.batch [ displayFlex, margin (px 0) ]


cellStyle =
    Css.batch
        [ displayFlex
        , justifyContentCenter
        , border3 (px 1) solid black
        , Css.height (px 20)
        , Css.width (px 20)
        , alignItems center
        , fontSize (px 20)
        ]


shadedCellStyle =
    backgroundColor black


selectedCellStyle =
    backgroundColor red



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
