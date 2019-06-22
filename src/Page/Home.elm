module Page.Home exposing (Model, Msg, init, update, view)

import Css exposing (px)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Session exposing (Session)
import View.Logo as Logo


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
    , content = content
    }


content : Html msg
content =
    div [ class "avenir", css [ Css.displayFlex, Css.flexDirection Css.column, Css.alignItems Css.center ] ]
        [ h3 [] [ text "Welcome to Crossword Games!" ]
        , div
            [ css [ Css.maxWidth (px 300) ]
            ]
            [ Logo.view ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )
