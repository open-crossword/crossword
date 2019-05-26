module Main exposing (main)

import Browser
import Data
import Html exposing (..)


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
    pre [] [ text Data.sampleData ]


update : Msg -> Model -> Model
update msg model =
    model
