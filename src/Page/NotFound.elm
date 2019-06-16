module Page.NotFound exposing (view)

import Html.Styled exposing (Html, div, h1, img, main_, text)
import Html.Styled.Attributes exposing (alt, class, id, src, tabindex)



-- VIEW --


view : { title : String, content : Html msg }
view =
    { title = "Page Not Found"
    , content =
        div [ class "avenir" ]
            [ h1 [] [ text "Not Found" ] ]
    }
