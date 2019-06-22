module Page.NotFound exposing (view)

import Css
import Html.Styled exposing (Html, div, h1, text)
import Html.Styled.Attributes exposing (..)
import Styles



-- VIEW --


view : { title : String, content : Html msg }
view =
    { title = "Page Not Found"
    , content =
        div
            [ css
                [ Styles.fonts.avenir
                ]
            ]
            [ h1 [] [ text "Not Found" ] ]
    }
