module Puzzle exposing (getClueById, getSelectedClueId, parse)

import Data.Board exposing (Selection)
import Data.Direction as Direction exposing (Direction(..))
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo exposing (OneOrTwo(..))
import Data.Puzzle exposing (Cell(..), CellMetadata, Clue, ClueId, Metadata, Puzzle)
import Dict exposing (Dict)
import List.Extra
import Parser exposing (..)
import Puzzle.Format.Xd


parse : String -> Result (List Parser.DeadEnd) Puzzle
parse input =
    Puzzle.Format.Xd.parse input


getClueById : Puzzle -> ClueId -> Maybe Clue
getClueById puzzle_ targetClueId =
    puzzle_.clues
        |> Dict.get targetClueId


getCellMetaData : Cell -> Maybe CellMetadata
getCellMetaData cell =
    case cell of
        Shaded ->
            Nothing

        Letter _ metadata ->
            metadata


getMatchingClueId : Direction -> OneOrTwo ClueId -> Maybe ClueId
getMatchingClueId direction clues =
    case clues of
        One clueId ->
            if isMatchingClueId direction clueId then
                Just clueId

            else
                Nothing

        Two clueIdOne clueIdTwo ->
            if isMatchingClueId direction clueIdOne then
                Just clueIdOne

            else if isMatchingClueId direction clueIdTwo then
                Just clueIdTwo

            else
                Nothing


directionFromClueId : ClueId -> Maybe Direction
directionFromClueId clueId =
    String.uncons clueId
        |> Maybe.map Tuple.first
        |> Maybe.andThen Direction.fromChar


isMatchingClueId : Direction -> ClueId -> Bool
isMatchingClueId direction clueId =
    Direction.toString direction
        == (directionFromClueId clueId
                |> Maybe.map Direction.toString
                |> Maybe.withDefault "no direction"
           )


getSelectedClueId : Puzzle -> Selection -> Maybe ClueId
getSelectedClueId puzzle selection =
    let
        direction =
            selection.direction

        selectedCell =
            Grid.get ( selection.x, selection.y ) puzzle.grid
    in
    selectedCell
        |> Maybe.andThen getCellMetaData
        |> Maybe.map .clue
        |> Maybe.andThen (getMatchingClueId direction)
