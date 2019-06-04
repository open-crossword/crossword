module Data.Board exposing (Board, Selection, fromPuzzle, isSelectedWord, moveSelectionToClue, revealCell, revealPuzzle, selectedClue, updateSelection)

import Data.Direction as Direction exposing (Direction)
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo as OneOrTwo
import Data.Point exposing (Point)
import Data.Puzzle as Puzzle exposing (Cell(..), Clue, ClueId, Puzzle)
import Dict


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


{-| Returns whether the specified point is part of the selected word
-}
isSelectedWord : Point -> Puzzle -> Board -> Bool
isSelectedWord point puzzle board =
    let
        clueId =
            selectedClue puzzle board
    in
    case Dict.get (Grid.pointToIndex point puzzle.grid) puzzle.cluesForCell of
        Just (OneOrTwo.One id) ->
            Maybe.map (\c -> c == id) clueId |> Maybe.withDefault False

        Just (OneOrTwo.Two id1 id2) ->
            Maybe.map (\c -> c == id1 || c == id2) clueId |> Maybe.withDefault False

        Nothing ->
            False


selectedClue : Puzzle -> Board -> Maybe ClueId
selectedClue puzzle board =
    puzzle.cluesForCell
        |> Dict.get (Grid.pointToIndex ( board.selection.x, board.selection.y ) puzzle.grid)
        |> Maybe.andThen (Puzzle.getMatchingClueId board.selection.direction)


updateSelection : Point -> Direction -> Board -> Board
updateSelection ( x, y ) direction board =
    { board
        | selection =
            { x = x
            , y = y
            , direction = direction
            }
    }


moveSelectionToClue : Clue -> Puzzle -> Board -> Board
moveSelectionToClue clue puzzle board =
    let
        fn : ( Point, Maybe Cell ) -> List Point -> List Point
        fn ( point, cell ) acc =
            if isSelectedWord point puzzle board then
                point :: acc

            else
                acc
    in
    Grid.foldlIndexed fn [] puzzle.grid
        |> List.reverse
        |> List.head
        |> Maybe.map (\point -> updateSelection point clue.id.direction board)
        |> Maybe.withDefault board
