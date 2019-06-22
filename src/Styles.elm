module Styles exposing (black, board, boardClue, cell, cellId, clue, hideOnMobile, justifyContentCenter, justifyContentSpaceBetween, letterCell, row, selectedCursorColor, selectedWordColor, shadedCell, toolbar)

import Css exposing (..)
import Css.Media as CssM


justifyContentCenter =
    Css.property "justify-content" "center"


justifyContentSpaceBetween =
    Css.property "justify-content" "space-between"


black =
    rgb 0 0 0


selectedCursorColor =
    -- rgb 255 218 0
    "#FFDA00"


selectedWordColor =
    -- rgb 167 216 255
    "#A7D8FF"


row =
    Css.batch [ displayFlex, margin (px 0) ]


cell =
    Css.batch
        [ displayFlex
        , justifyContentCenter
        , border3 (px 1) solid black
        , Css.height (px 30)
        , Css.width (px 30)
        , alignItems center
        , fontSize (px 13)
        , position relative
        ]


letterCell =
    Css.batch
        [ Css.cursor Css.pointer
        ]


cellId =
    Css.batch
        [ position absolute
        , top (px 1)
        , left (px 1)
        , fontSize (px 10)
        ]


shadedCell =
    backgroundColor black


board =
    Css.batch
        [ Css.property "user-select" "none"
        , Css.property "-moz-user-select" "none"
        , Css.property "-webkit-user-select" "none"
        , Css.property "-webkit-touch-callout" "none"
        ]


clue =
    Css.batch
        [ Css.cursor Css.pointer
        , Css.padding2 (px 2) (px 5)
        ]


boardClue =
    Css.batch
        [ backgroundColor (Css.hex selectedWordColor)
        , Css.padding (px 16)
        ]


toolbar =
    Css.batch
        [ Css.marginBottom (px 16)
        , Css.marginTop (px 16)
        ]


hideOnMobile =
    CssM.withMedia [ CssM.only CssM.screen [ CssM.maxWidth (px 500) ] ]
        [ Css.display Css.none ]
