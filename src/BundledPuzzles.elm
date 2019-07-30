module BundledPuzzles exposing (bundledId, getBundledPuzzleById, puzzles)

import Data.Puzzle as Puzzle exposing (Puzzle)
import Data.Puzzle.Id as PuzzleId exposing (PuzzleId)
import Gen.BundledPuzzles
import List.Extra as List
import Puzzle.Format.Xd as Xd


parseBundledPuzzle : Int -> String -> Maybe Puzzle
parseBundledPuzzle i string =
    string
        |> Xd.parse (bundledId i)
        |> Result.toMaybe


puzzles : List Puzzle
puzzles =
    List.indexedMap parseBundledPuzzle Gen.BundledPuzzles.puzzles
        |> List.filterMap identity


bundledId : Int -> PuzzleId
bundledId i =
    ("bundled_" ++ String.fromInt i)
        |> PuzzleId.fromString


getBundledPuzzleById : PuzzleId -> Maybe Puzzle
getBundledPuzzleById id =
    PuzzleId.toString id
        |> String.split "_"
        |> List.drop 1
        |> List.head
        |> Maybe.andThen String.toInt
        |> Maybe.andThen (\i -> List.getAt i puzzles)
