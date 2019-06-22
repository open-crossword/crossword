module View.Logo exposing (view)

import Html.Styled exposing (..)
import Svg.Styled as Svg exposing (Svg)
import Svg.Styled.Attributes as SvgA


type Square
    = White
    | Black


view : Html msg
view =
    let
        grid =
            [ [ Black, White, White, White ]
            , [ White, White, Black, White ]
            , [ White, Black, White, White ]
            , [ White, White, White, Black ]
            ]
    in
    Svg.svg
        [ SvgA.viewBox "0 0 21 21" ]
        [ Svg.rect
            [ SvgA.width "21"
            , SvgA.height "21"
            , SvgA.x "0"
            , SvgA.y "0"
            , SvgA.fill "none"
            , SvgA.stroke "black"
            , SvgA.strokeWidth "1"
            ]
            []
        , Svg.g [] (List.indexedMap viewCell (List.concat grid))
        ]


viewCell : Int -> Square -> Svg msg
viewCell index square =
    let
        color =
            case square of
                White ->
                    "white"

                Black ->
                    "black"

        x =
            toFloat (5 * modBy 4 index) + 0.5

        y =
            toFloat (5 * (index // 4)) + 0.5
    in
    Svg.rect
        [ SvgA.x (String.fromFloat x)
        , SvgA.y (String.fromFloat y)
        , SvgA.width "5"
        , SvgA.height "5"
        , SvgA.stroke "black"
        , SvgA.strokeWidth ".4"
        , SvgA.fill color
        ]
        []
