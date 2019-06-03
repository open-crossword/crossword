module Data.Board exposing (Board, Selection, fromPuzzle, revealPuzzle, updateSelection)

import Data.Direction as Direction exposing (Direction)
import Data.Grid as Grid exposing (Grid)
import Data.Point exposing (Point)
import Data.Puzzle exposing (Cell(..), Puzzle)


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
fromPuzzle { grid } =
    { grid =
        Grid.map
            (\cell ->
                case cell of
                    Just Shaded ->
                        Just Shaded

                    Just (Letter _) ->
                        Just (Letter ' ')

                    Nothing ->
                        Nothing
            )
            grid

    -- TODO Temporarily set our default selection to 0,0
    -- This may not be a valid word start
    , selection =
        { x = 0
        , y = 0
        , direction = Direction.Across
        }
    }


revealPuzzle : Puzzle -> Board -> Board
revealPuzzle { grid } board =
    { board | grid = grid }


updateSelection : Point -> Direction -> Board -> Board
updateSelection ( x, y ) direction board =
    { board
        | selection =
            { x = x
            , y = y
            , direction = direction
            }
    }
