module View.Icons exposing (toHtml)

import FeatherIcons
import Html.Styled as Html exposing (Html)


toHtml : FeatherIcons.Icon -> Html msg
toHtml icon =
    icon |> FeatherIcons.toHtml [] |> Html.fromUnstyled
