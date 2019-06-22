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
        [ SvgA.viewBox "-2 -2 24 24" ]
        [ Svg.rect
            [ SvgA.width "22"
            , SvgA.height "22"
            , SvgA.x "-1"
            , SvgA.y "-1"
            , SvgA.fill "none"
            , SvgA.stroke "black"
            , SvgA.strokeWidth "2"
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
    in
    Svg.rect
        [ SvgA.x (String.fromInt (5 * modBy 4 index))
        , SvgA.y (String.fromInt (5 * (index // 4)))
        , SvgA.width "5"
        , SvgA.height "5"
        , SvgA.stroke "black"
        , SvgA.strokeWidth ".5"
        , SvgA.fill color
        ]
        []
