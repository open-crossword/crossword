module Puzzle exposing (parse)

import Data.Board exposing (Selection)
import Data.Direction as Direction exposing (Direction(..))
import Data.Grid as Grid exposing (Grid)
import Data.Puzzle exposing (Puzzle)
import Parser exposing (..)
import Puzzle.Format.Xd


parse : String -> Result (List Parser.DeadEnd) Puzzle
parse input =
    Puzzle.Format.Xd.parse input
