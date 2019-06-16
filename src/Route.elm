module Route exposing (Route(..), fromUrl)

import Html
import Html.Attributes exposing (href)
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s, string)


type Route
    = Root
    | Game String


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Root Parser.top
        , Parser.map Game (s "game" </> string)
        ]


fromUrl : Url -> Maybe Route
fromUrl url =
    { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }
        |> Parser.parse parser


toParts : Route -> List String
toParts route =
    case route of
        Root ->
            []

        Game string ->
            [ "game", string ]


toHref : Route -> Html.Attribute msg
toHref route =
    let
        parts =
            toParts route
    in
    href ("#/" ++ String.join "/" parts)
