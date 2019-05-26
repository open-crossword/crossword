module Main exposing (main)

import Browser
import Data
import Html exposing (..)
import Puzzle exposing (Grid, Metadata, Puzzle)


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
        , viewGrid puzzle.grid
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
    text (Debug.toString grid)


update : Msg -> Model -> Model
update msg model =
    model
