module Page.Home exposing (Model, Msg, init, view, update)

import Session exposing (Session)
import Html exposing (..)


type Msg
    = NoOp


type alias Model =
    {}


init : Session -> (Model, Cmd Msg)
init session =
    ({}, Cmd.none)


view : Model -> { title : String, content : Html Msg }
view model =
    { title = "Home"
    , content = div [] [ text "I am home" ]
    }

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    (model, Cmd.none)
