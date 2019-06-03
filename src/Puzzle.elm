module Puzzle exposing (getSelectedClueId, parse)

import Data.Board exposing (Selection)
import Data.Direction as Direction exposing (Direction(..))
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo exposing (OneOrTwo(..))
import Data.Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle)
import Dict exposing (Dict)
import List.Extra
import Parser exposing (..)
import Puzzle.Format.Xd


parse : String -> Result (List Parser.DeadEnd) Puzzle
parse input =
    Puzzle.Format.Xd.parse input


getMatchingClueId : Direction -> OneOrTwo ClueId -> Maybe ClueId
getMatchingClueId direction clues =
    case clues of
        One clueId ->
            if direction == clueId.direction then
                Just clueId

            else
                Nothing

        Two clueIdOne clueIdTwo ->
            if direction == clueIdOne.direction then
                Just clueIdOne

            else if direction == clueIdTwo.direction then
                Just clueIdTwo

            else
                Nothing


getSelectedClueId : Puzzle -> Selection -> Maybe ClueId
getSelectedClueId puzzle selection =
    puzzle.cluesForCell
        |> Dict.get (Grid.pointToIndex ( selection.x, selection.y ) puzzle.grid)
        |> Maybe.andThen (getMatchingClueId selection.direction)
