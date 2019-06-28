module Route exposing (Route(..), about, defaultGame, fromUrl, gameForId, home)

import Data.Puzzle.Id as PuzzleId exposing (PuzzleId)
import Html.Styled as Html
import Html.Styled.Attributes exposing (href)
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s)


type Route
    = Home
    | Game (Maybe PuzzleId)
    | About


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Home Parser.top
        , Parser.map Game (s "game" </> Parser.map (PuzzleId.fromString >> Just) Parser.string)
        , Parser.map (Game Nothing) (s "game")
        , Parser.map About (s "about")
        ]


fromUrl : Url -> Maybe Route
fromUrl url =
    { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }
        |> Parser.parse parser


toParts : Route -> List String
toParts route =
    case route of
        Home ->
            []

        Game (Just id) ->
            [ "game", PuzzleId.toString id ]

        Game Nothing ->
            [ "game" ]

        About ->
            [ "about" ]


toHref : Route -> Html.Attribute msg
toHref route =
    let
        parts =
            toParts route
    in
    href ("#/" ++ String.join "/" parts)


defaultGame : Html.Attribute msg
defaultGame =
    toHref (Game Nothing)


gameForId : PuzzleId -> Html.Attribute msg
gameForId id =
    toHref (Game (Just id))


home : Html.Attribute msg
home =
    toHref Home


about : Html.Attribute msg
about =
    toHref About
