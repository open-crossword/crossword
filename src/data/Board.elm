module Data.Board exposing (Board, Selection, fromPuzzle, revealCell, revealPuzzle, updateSelection)

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
    let
        notShaded =
            Maybe.map (\cell_ -> cell_ /= Shaded)
                >> Maybe.withDefault True

        firstNonShaded =
            Grid.findIndex notShaded grid
                |> Maybe.withDefault 0

        startSelection =
            Grid.indexToPoint firstNonShaded grid
    in
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
    , selection =
        { x = Tuple.first startSelection
        , y = Tuple.second startSelection
        , direction = Direction.Across
        }
    }


revealPuzzle : Puzzle -> Board -> Board
revealPuzzle { grid } board =
    { board | grid = grid }


revealCell : Puzzle -> Board -> Board
revealCell puzzle board =
    let
        selection =
            ( board.selection.x, board.selection.y )

        selectedCell =
            Grid.get selection puzzle.grid
    in
    case selectedCell of
        Just letter ->
            { board
                | grid =
                    Grid.set selection letter board.grid
            }

        _ ->
            board


updateSelection : Point -> Direction -> Board -> Board
updateSelection ( x, y ) direction board =
    { board
        | selection =
            { x = x
            , y = y
            , direction = direction
            }
    }
