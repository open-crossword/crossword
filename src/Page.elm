module Page exposing (Page(..), view)

import Browser exposing (Document)
import Css exposing (px, rgb)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick)
import Route exposing (Route)
import Session exposing (Session)
import Styles
import View.Logo as Logo


type Page
    = Other
    | Home
    | Game
    | About


view : Session -> Page -> { title : String, content : Html msg } -> Document msg
view session page { title, content } =
    { title = title
    , body = List.map toUnstyled [ viewHeader page, content, viewFooter ]
    }


viewHeader : Page -> Html msg
viewHeader page =
    div
        [ css
            [ Css.overflow Css.hidden
            , Css.displayFlex
            , Css.alignItems Css.center
            , Css.backgroundColor Styles.colors.lightGrey
            ]
        , class "avenir"
        ]
        [ a
            [ Route.home
            , css
                [ Css.textDecoration Css.none
                , Css.float Css.left
                , Css.alignItems Css.center
                , Css.margin (px 14)
                , Css.marginRight (px 0)
                , Css.maxWidth (px 25)
                ]
            ]
            [ Logo.view ]
        , viewHeaderLink Route.home "Crossword Games"
        , viewHeaderLink (Route.gameForId "default") "Solo Game"
        , viewHeaderLink Route.about "About"
        ]


viewHeaderLink : Html.Styled.Attribute msg -> String -> Html msg
viewHeaderLink route string =
    a
        [ css
            [ Css.float Css.left
            , Css.textAlign Css.center
            , Css.padding (px 14)
            , Css.textDecoration Css.none
            , Css.outline Css.zero
            ]
        , route
        ]
        [ text string ]


viewFooter : Html msg
viewFooter =
    div [] []
