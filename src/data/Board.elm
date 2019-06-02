module Data.Board exposing (Board, Selection, fromPuzzle)

import Data.Direction as Direction exposing (Direction)
import Data.Grid exposing (Grid)
import Data.Puzzle exposing (Cell, Puzzle)


type alias Board =
    { grid : Grid Cell
    , selection : Selection
    }


type alias Selection =
    { x : Int
    , y : Int
    , direction : Direction
    }


{-| Creates a default board state for a given puzzle.
-}
fromPuzzle : Puzzle -> Board
fromPuzzle puzzle =
    { -- TODO Temporarily filling in grid to as puzzle answer
      grid = puzzle.grid

    -- TODO Temporarily set our default selection to 0,0
    -- This may not be a valid word start
    , selection =
        { x = 0
        , y = 0
        , direction = Direction.Across
        }
    }
