module Page exposing (Page(..), view)

import Browser exposing (Document)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick)
import Session exposing (Session)


type Page
    = Other
    | Home
    | Game


view : Session -> Page -> { title : String, content : Html msg } -> Document msg
view session page { title, content } =
    { title = title
    , body = List.map toUnstyled [ viewHeader page, content, viewFooter ]
    }


viewHeader : Page -> Html msg
viewHeader page =
    div [] [ text "The Header" ]


viewFooter : Html msg
viewFooter =
    div [] [ text "The footer" ]
