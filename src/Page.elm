module Page exposing (Page(..), view)

import Browser exposing (Document)
import Session exposing (Session)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


type Page
    = Other
    | Home


view : Session -> Page -> { title : String, content : Html msg } -> Document msg
view session page { title, content } =
    { title = title
    , body = [ viewHeader page, content, viewFooter ]
    }


viewHeader : Page -> Html msg
viewHeader page =
    div [] [ text "The Header" ]


viewFooter : Html msg
viewFooter =
    div [] [ text "The footer" ]
