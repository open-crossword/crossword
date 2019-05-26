module Main exposing (main)

import Browser
import Data
import Html exposing (..)
import Puzzle


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
    pre [] [ text (Debug.toString (Puzzle.parse Data.sampleData)) ]


update : Msg -> Model -> Model
update msg model =
    model
