module Data.Board exposing (Board, Selection, fromPuzzle, isSelectedWord, moveSelection, moveSelectionToWord, revealPuzzle, revealSelectedCell, revealSelectedWord, selectedClue, updateSelection)

import Data.Direction as Direction exposing (Direction)
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo as OneOrTwo
import Data.Point as Point exposing (Point)
import Data.Puzzle as Puzzle exposing (Cell(..), Clue, ClueId, Puzzle)
import Dict


type alias Board =
    { grid : Grid Cell
    , selection : Selection
    }


type alias Selection =
    { cursor : Point
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
        { cursor = startSelection
        , direction = Direction.Across
        }
    }


revealPuzzle : Puzzle -> Board -> Board
revealPuzzle { grid } board =
    { board | grid = grid }


revealSelectedWord : Puzzle -> Board -> Board
revealSelectedWord puzzle board =
    let
        reveal : Point -> Maybe Cell -> Maybe Cell
        reveal point cell =
            if isSelectedWord point puzzle board then
                case cell of
                    Just (Letter _) ->
                        Grid.get point puzzle.grid

                    _ ->
                        cell

            else
                cell
    in
    { board | grid = Grid.indexedMap reveal board.grid }


revealSelectedCell : Puzzle -> Board -> Board
revealSelectedCell puzzle board =
    let
        cursor =
            board.selection.cursor

        selectedCell =
            Grid.get cursor puzzle.grid
    in
    case selectedCell of
        Just letter ->
            { board
                | grid =
                    Grid.set cursor letter board.grid
            }

        _ ->
            board


{-| Returns whether the specified point is part of the currently selected word
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


{-| Returns whether the specified point is part of the specified clue
-}
isPartOfWord : Clue -> Point -> Puzzle -> Bool
isPartOfWord clue point puzzle =
    case Dict.get (Grid.pointToIndex point puzzle.grid) puzzle.cluesForCell of
        Just (OneOrTwo.One clueId) ->
            clue.id == clueId

        Just (OneOrTwo.Two id1 id2) ->
            clue.id == id1 || clue.id == id2

        Nothing ->
            False


selectedClue : Puzzle -> Board -> Maybe ClueId
selectedClue puzzle board =
    puzzle.cluesForCell
        |> Dict.get (Grid.pointToIndex board.selection.cursor puzzle.grid)
        |> Maybe.andThen (Puzzle.getMatchingClueId board.selection.direction)


updateSelection : Point -> Direction -> Board -> Board
updateSelection point direction board =
    { board
        | selection =
            { cursor = Point.clamp ( 0, 0 ) ( Grid.width board.grid - 1, Grid.height board.grid - 1 ) point
            , direction = direction
            }
    }


moveSelectionToWord : Clue -> Puzzle -> Board -> Board
moveSelectionToWord clue puzzle board =
    let
        fn : ( Point, Maybe Cell ) -> List Point -> List Point
        fn ( point, _ ) acc =
            if isPartOfWord clue point puzzle then
                point :: acc

            else
                acc
    in
    Grid.foldlIndexed fn [] puzzle.grid
        |> List.reverse
        |> List.head
        |> Maybe.map (\point -> updateSelection point clue.id.direction board)
        |> Maybe.withDefault board


{-| Moves the cursor of the specified board a unit in the specified direction skipping shaded cells.
-}
moveSelection : Grid.Direction -> Board -> Board
moveSelection direction board =
    let
        selection =
            board.selection

        helper : Grid.Direction -> Point -> Point -> Point
        helper dir original ( x, y ) =
            let
                nextPoint =
                    case dir of
                        Grid.Up ->
                            ( x, y - 1 )

                        Grid.Down ->
                            ( x, y + 1 )

                        Grid.Left ->
                            ( x - 1, y )

                        Grid.Right ->
                            ( x + 1, y )

                nextCell =
                    Grid.get nextPoint board.grid
            in
            case Maybe.map (\cell_ -> cell_ /= Shaded) nextCell of
                -- Next cell is not shaded, so advance to that position
                Just True ->
                    nextPoint

                -- Next cell is shaded, recurse to find the next unshaded position
                Just False ->
                    helper direction original nextPoint

                -- We hit the edge of the grid while recursing past shaded cells,
                -- return to our original unshaded position
                Nothing ->
                    original
    in
    updateSelection (helper direction selection.cursor selection.cursor) selection.direction board
