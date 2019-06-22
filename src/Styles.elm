module Styles exposing (board, boardClue, cell, cellId, clue, hideOnMobile, justifyContentCenter, justifyContentSpaceBetween, letterCell, row, colors, shadedCell, toolbar, colorToRgbString)

import Css exposing (..)
import Css.Media as CssM


colorToRgbString : Css.Color -> String
colorToRgbString {red, green, blue} =
    "red(" ++ String.fromInt red ++ "," ++ String.fromInt green ++ "," ++ String.fromInt blue ++ ")"
colors =
    { white = rgb 255 255 255
    , black = rgb 0 0 0
    , hotPink = rgb 255 65 180
    , selectedCursor = hex "#FFDA00"
    , selectedWord = hex "#A7D8FF"
    }


buttonStyle =
    Css.batch
        [ hover
            [ backgroundColor colors.white
            ]
        ]


justifyContentCenter =
    Css.property "justify-content" "center"


justifyContentSpaceBetween =
    Css.property "justify-content" "space-between"


row =
    Css.batch
        [ displayFlex
        , margin (px 0)
        ]


cell =
    Css.batch
        [ displayFlex
        , justifyContentCenter
        , border3 (px 1) solid colors.black
        , height (px 30)
        , width (px 30)
        , alignItems center
        , fontSize (px 13)
        , position relative
        ]


letterCell =
    Css.batch
        [ cursor pointer
        ]


cellId =
    Css.batch
        [ position absolute
        , top (px 1)
        , left (px 1)
        , fontSize (px 10)
        ]


shadedCell =
    backgroundColor colors.black


board =
    Css.batch
        [ property "user-select" "none"
        , property "-moz-user-select" "none"
        , property "-webkit-user-select" "none"
        , property "-webkit-touch-callout" "none"
        ]


clue =
    Css.batch
        [ cursor pointer
        , padding2 (px 2) (px 5)
        ]


boardClue =
    Css.batch
        [ backgroundColor colors.selectedWord
        , padding (px 16)
        ]


toolbar =
    Css.batch
        [ marginBottom (px 16)
        , marginTop (px 16)
        ]


hideOnMobile =
    CssM.withMedia [ CssM.only CssM.screen [ CssM.maxWidth (px 500) ] ]
        [ display none ]
