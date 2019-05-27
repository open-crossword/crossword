module Main exposing (main)

import Browser
import Data
import File exposing (File)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (preventDefaultOn)
import Json.Decode as Decode
import Parser
import Puzzle exposing (Cell(..), Clue, Grid, Metadata, Puzzle)
import Task


type alias Model =
    { puzzle : Result (List Parser.DeadEnd) Puzzle }


type Msg
    = OnDropFile File (List File)
    | OnFileRead String
    | NoOp


init : ( Model, Cmd Msg )
init =
    ( { puzzle = Puzzle.parse Data.sampleData
      }
    , Cmd.none
    )


main : Program () Model Msg
main =
    Browser.element
        { init = always init
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }


dropDecoder : Decode.Decoder Msg
dropDecoder =
    Decode.at [ "dataTransfer", "files" ] (Decode.oneOrMore OnDropFile File.decoder)


hijackOn : String -> Decode.Decoder msg -> Attribute msg
hijackOn event decoder =
    Html.Events.preventDefaultOn event (Decode.map hijack decoder)


hijack : msg -> ( msg, Bool )
hijack msg =
    ( msg, True )


view : Model -> Html Msg
view model =
    div
        [ hijackOn "drop" dropDecoder
        , hijackOn "dragover" (Decode.succeed NoOp)
        ]
        [ case model.puzzle of
            Ok puzzle ->
                viewPuzzle puzzle

            Err err ->
                pre [] [ text (Debug.toString err) ]
        ]


viewPuzzle : Puzzle -> Html Msg
viewPuzzle puzzle =
    div []
        [ viewMetadata puzzle.metadata
        , hr [] []
        , viewGrid puzzle.grid
        , hr [] []
        , viewClues puzzle.clues
        , node "style" [] [ text """
.row {
  display: flex;
  margin: 0;
}

.cell {
display: flex;
justify-content: center;
border: 1px solid black;
height: 20px;
width: 20px;
align-items: center;
font-size: 20px;
}

.cell.shaded {
background-color: black;
}

""" ]
        ]


viewMetadata : Metadata -> Html Msg
viewMetadata metadata =
    div []
        [ div [] [ text ("Title: " ++ Maybe.withDefault "" metadata.title) ]
        , div [] [ text ("Author: " ++ Maybe.withDefault "" metadata.author) ]
        , div [] [ text ("Editor: " ++ Maybe.withDefault "" metadata.editor) ]
        , div [] [ text ("Date: " ++ Maybe.withDefault "" metadata.date) ]
        ]


viewGrid : Grid -> Html Msg
viewGrid grid =
    div
        [ class "grid"
        ]
        (List.map viewRow grid)


viewRow : List Cell -> Html Msg
viewRow row =
    pre
        [ class "row"
        ]
        (List.map viewCell row)


viewCell : Cell -> Html Msg
viewCell cell =
    case cell of
        Letter x ->
            div [ class "cell" ] [ text (String.fromChar x) ]

        Shaded ->
            b [ class "cell shaded" ] [ text "" ]


viewClues : List Clue -> Html Msg
viewClues clues =
    div [] (List.map viewClue clues)


viewClue : Clue -> Html Msg
viewClue clue =
    div [] [ text (Debug.toString clue) ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnDropFile file _ ->
            ( model, File.toString file |> Task.perform OnFileRead )

        OnFileRead content ->
            ( { model | puzzle = Puzzle.parse content }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )
