module Page exposing (Page(..), view)

import Browser exposing (Document)
import Css exposing (px, rgb)
import Css.Media as CssM
import FeatherIcons
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


type alias Config msg =
    { session : Session
    , page : Page
    , content : { title : String, content : Html msg }
    , onMenuToggle : msg
    }


view : Config msg -> Document msg
view config =
    { title = config.content.title
    , body =
        List.map toUnstyled
            [ viewHeader config
            , config.content.content
            , viewFooter
            ]
    }


viewHeader : Config msg -> Html msg
viewHeader config =
    nav
        [ css
            [ Css.displayFlex
            , Css.alignItems Css.center
            , Css.backgroundColor Styles.colors.lightGrey
            , Css.padding (px 14)
            , Styles.fonts.avenir
            , Styles.isMobile
                [ Css.flexDirection Css.column ]
                []
            ]
        ]
        [ div
            [ css
                [ Css.displayFlex
                , Css.alignItems Css.center
                , Css.paddingRight (px 20)
                ]
            ]
            [ a
                [ css
                    [ Css.displayFlex
                    , Css.alignItems Css.center
                    , Css.textDecoration Css.none
                    , Css.outline Css.zero
                    , Css.color Styles.colors.black
                    ]
                , Route.home
                ]
                [ div
                    [ Route.home
                    , css
                        [ Css.marginRight (px 14)
                        , Css.maxWidth (px 25)
                        ]
                    ]
                    [ Logo.view ]
                , text "Crossword Games"
                ]
            , hamburgerMenuToggle config.onMenuToggle
            ]
        , viewHeaderLink config.session (Route.gameForId "default") "Solo Game"
        , viewHeaderLink config.session Route.about "About"
        ]


hamburgerMenuToggle onMenuToggle =
    div
        [ css
            [ Styles.isMobile
                [ Css.position Css.absolute
                , Css.cursor Css.pointer
                , Css.right (px 30)
                ]
                [ Css.display Css.none ]
            ]
        , onClick onMenuToggle
        ]
        [ (FeatherIcons.menu |> FeatherIcons.toHtml []) |> Html.Styled.fromUnstyled ]


viewHeaderLink : Session -> Html.Styled.Attribute msg -> String -> Html msg
viewHeaderLink session route string =
    let
        showMenu =
            if session.menuCollapsed then
                [ Css.display Css.none ]

            else
                []
    in
    a
        [ css
            [ Styles.isMobile
                showMenu
                [ Css.paddingRight (px 20) ]
            , Css.textDecoration Css.none
            , Css.outline Css.zero
            , Css.color Styles.colors.black
            ]
        , route
        ]
        [ text string ]


viewFooter : Html msg
viewFooter =
    div [] []
