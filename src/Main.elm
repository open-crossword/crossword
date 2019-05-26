module Main exposing (main)

import Browser
import Data
import Html exposing (..)
import Puzzle exposing (Puzzle)


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
    let
        metadata =
            puzzle.metadata
    in
    div []
        [ div [] [ text (Maybe.withDefault "" metadata.title) ]
        , div [] [ text (Maybe.withDefault "" metadata.author) ]
        , div [] [ text (Maybe.withDefault "" metadata.editor) ]
        , div [] [ text (Maybe.withDefault "" metadata.date) ]
        ]


update : Msg -> Model -> Model
update msg model =
    model
