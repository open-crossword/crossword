module Styles exposing (board, boardClue, cell, cellId, clue, colorToRgbString, colors, fonts, hideOnMobile, isMobile, justifyContentCenter, justifyContentSpaceBetween, letterCell, row, shadedCell, toolbar)

import Css exposing (..)
import Css.Media as CssM


colors =
    { white = hex "#FFFFFF"
    , black = hex "#000000"
    , hotPink = hex "#FF41B4"
    , selectedCursor = hex "#FFDA00"
    , selectedWord = hex "#A7D8FF"
    , lightGrey = hex "#F4F4F4"
    , lightGreen = hex "#9EEBCF"
    }


fontSizes =
    { xs = px 12
    , sm = px 14
    , reg = px 16
    , lg = px 18
    , xl = px 21
    }


fonts =
    { avenir = Css.fontFamilies [ "avenir next", "avenir", "san-serif" ]
    }



-- fontWeights =
--     {
--         fw1 =
--     }


colorToRgbString : Css.Color -> String
colorToRgbString { red, green, blue } =
    "rgb("
        ++ String.fromInt red
        ++ ","
        ++ String.fromInt green
        ++ ","
        ++ String.fromInt blue
        ++ ")"


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
        , fontSize (px 12)
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


isMobile : List Css.Style -> List Css.Style -> Css.Style
isMobile mobileCss nonMobileCss =
    Css.batch
        [ CssM.withMedia [ CssM.only CssM.screen [ CssM.maxWidth (px 500) ] ]
            mobileCss
        , CssM.withMedia [ CssM.only CssM.screen [ CssM.minWidth (px 500) ] ]
            nonMobileCss
        ]
