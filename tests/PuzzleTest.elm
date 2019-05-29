module PuzzleTest exposing (suite)

import Expect exposing (Expectation)
import SamplePuzzle
import Fuzz exposing (Fuzzer, int, list, string)
import Puzzle as Puzzle
import Test exposing (..)


suite : Test
suite =
    describe "The Puzzle module"
        [ describe "Puzzle.parse"
            [ test "can parse the sample data" <|
                \_ ->
                    Puzzle.parse SamplePuzzle.puzzle
                        |> Expect.ok
            ]
        ]
