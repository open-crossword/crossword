module Page.About exposing (Model, Msg, init, update, view)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Session exposing (Session)
import Styles


type Msg
    = NoOp


type alias Model =
    {}


init : Session -> ( Model, Cmd Msg )
init session =
    ( {}, Cmd.none )


view : Model -> { title : String, content : Html Msg }
view model =
    { title = "About"
    , content =
        div
            [ css [ Styles.fonts.avenir ]
            ]
            [ text "This is the about page" ]
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )
