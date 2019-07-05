module Styles exposing (board, boardClue, buttonStyle, cell, cellId, clue, colorToRgbString, colors, fonts, forDesktop, forMobile, hideOnDesktop, hideOnMobile, ifMobileElse, justifyContentCenter, justifyContentSpaceBetween, keyboard, letterCell, row, shadedCell, shimmerAnimation, toolbar, widths)

import Css exposing (..)
import Css.Animations as CssA
import Css.Media as CssM


colors =
    { white = hex "#FFFFFF"
    , black = hex "#000000"
    , hotPink = hex "#FF41B4"
    , selectedCursor = hex "#FFDA00"
    , selectedWord = hex "#A7D8FF"
    , lightGrey = hex "#FAFAFA"
    , lightGreen = hex "#9EEBCF"
    }


widths =
    { p70 = Css.width (pct 70)
    , p90 = Css.width (pct 90)
    , p100 = Css.width (pct 100)
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
        [ backgroundColor colors.lightGrey
        , border3 (px 1) solid colors.black
        , margin (px 2)
        , padding (px 7)
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


mobileBreakWidth =
    px 500


forMobile css_ =
    CssM.withMedia [ CssM.only CssM.screen [ CssM.maxWidth mobileBreakWidth ] ]
        css_


forDesktop css_ =
    CssM.withMedia [ CssM.only CssM.screen [ CssM.minWidth mobileBreakWidth ] ]
        css_


hideOnMobile =
    forMobile
        [ display none ]


hideOnDesktop =
    forDesktop
        [ display none ]


ifMobileElse : List Css.Style -> List Css.Style -> Css.Style
ifMobileElse mobileCss nonMobileCss =
    Css.batch
        [ forMobile mobileCss
        , forDesktop nonMobileCss
        ]


shimmerAnimation =
    Css.batch
        [ Css.animationDuration (sec 2)
        , Css.property "animation-fill-mode" "forwards"
        , Css.property "animation-iteration-count" "infinite"
        , Css.animationName
            (CssA.keyframes
                [ ( 0, [ CssA.property "background-position" "-1200px 0" ] )
                , ( 100, [ CssA.property "background-position" "1200px 0" ] )
                ]
            )
        , Css.property "animation-timing-function" "linear"
        , Css.backgroundColor (hex "#F0F0F5")
        , Css.backgroundImage
            (Css.linearGradient2 (deg 125)
                (stop2 (hex "#F0F0F5") <| pct 4)
                (stop2 (hex "#E9E9ED") <| pct 25)
                [ stop2 (hex "#F0F0F5") <| pct 36 ]
            )
        , Css.backgroundSize2 (px 1200) (pct 100)
        ]


noSelection =
    batch
        [ property "-webkit-user-select" "none"
        , property "-moz-user-select" "none"
        , property "-ms-user-select" "none"
        , property "user-select" "none"
        ]


keyboard =
    { container =
        batch
            [ position fixed
            , width (pct 100)
            , backgroundColor colors.hotPink
            , bottom (px 0)
            , left (px 0)
            , paddingBottom (px 5)
            , noSelection
            ]
    , row =
        batch
            [ displayFlex
            , justifyContentCenter

            -- , padding2 (px 0) (pct 5)
            ]
    , keys =
        batch
            [ padding (px 5)
            ]
    , key =
        batch
            [ backgroundColor colors.white
            , width (pct 9)
            , margin (px 3)
            , height (px 40)
            , displayFlex
            , justifyContentCenter
            , alignItems center
            , property "touch-action" "manipulation"
            , borderRadius (px 3)
            ]
    , clues =
        batch
            [ displayFlex
            , justifyContentSpaceBetween
            , alignItems center
            , fontSize fontSizes.sm
            , backgroundColor colors.selectedWord
            , padding (px 8)
            ]
    , arrow =
        batch
            [ displayFlex
            , alignItems center
            , property "touch-action" "manipulation"
            ]
    }
