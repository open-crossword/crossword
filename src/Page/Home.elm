module Page.Home exposing (Model, Msg, init, update, view)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Session exposing (Session)


type Msg
    = NoOp


type alias Model =
    {}


init : Session -> ( Model, Cmd Msg )
init session =
    ( {}, Cmd.none )


view : Model -> { title : String, content : Html Msg }
view model =
    { title = "Home"
    , content = div [ class "avenir" ] [ text "I am home" ]
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )
