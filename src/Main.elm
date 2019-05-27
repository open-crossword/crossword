module Main exposing (main)

import Browser
import Data
import Html exposing (..)
import Html.Attributes exposing (..)
import Puzzle exposing (Cell(..), Grid, Metadata, Puzzle, Clue)


type alias Model =
    {}


type Msg
    = NoOp


main : Program () Model Msg
main =
    Browser.sandbox
        { init = {}
        , view = view
        , update = update
        }


view : Model -> Html Msg
view model =
    case Puzzle.parse Data.sampleData of
        Ok puzzle ->
            viewPuzzle puzzle

        Err err ->
            pre [] [ text (Debug.toString err) ]


viewPuzzle : Puzzle -> Html Msg
viewPuzzle puzzle =
    div []
        [ viewMetadata puzzle.metadata
        , hr [] []
        , viewGrid puzzle.grid
        , hr [] []
        , viewClues puzzle.clues
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
        [ style "width" "300px"
        , style "border" "1px solid black"
        , class "grid"
        ]
        (List.map viewRow grid)


viewRow : List Cell -> Html Msg
viewRow row =
    pre
        [ style "display" "flex"
        , style "justify-content" "space-around"
        , class "row"
        ]
        (List.map viewCell row)


viewCell : Cell -> Html Msg
viewCell cell =
    case cell of
        Letter x ->
            div [ class "cell" ] [ text (String.fromChar x) ]

        Shaded ->
            b [ class "cell shaded" ] [ text "■" ]


viewClues : List Clue -> Html Msg
viewClues clues =
    div [] (List.map viewClue clues)


viewClue : Clue -> Html Msg
viewClue clue =
    div [] [ text (Debug.toString clue) ]


update : Msg -> Model -> Model
update msg model =
    model
