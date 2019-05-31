module Data.Board exposing (Board, Selection)

import Data.Direction exposing (Direction)
import Data.Grid exposing (Grid)
import Data.Puzzle exposing (Cell)


type alias Board =
    { grid : Grid Cell
    , selection : Selection
    }


type alias Selection =
    { x : Int
    , y : Int
    , direction : Direction
    }
