module Main exposing (main)

import Html exposing (..)
import Browser


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
    div [] [ text "hey" ]


update : Msg -> Model -> Model  
update msg model =
     model
