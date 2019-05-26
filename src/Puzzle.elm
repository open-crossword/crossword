module Puzzle exposing (Puzzle, parse)

import Array exposing (Array)
import Parser exposing (Parser)


type alias Puzzle =
    { grid : Array (Array Cell)
    , clues : List Clue
    , metadata : Metadata
    , notes : Maybe String
    }


type alias Clue =
    { clue : String
    , answer : String
    , index : Index
    }


type alias Metadata =
    { title : Maybe String
    , author : Maybe String
    , editor : Maybe String
    , date : Maybe String
    }


type Index
    = Across Int
    | Down Int


type Cell
    = Shaded
    | Letter Char


parse : String -> Result (List Parser.DeadEnd) Puzzle
parse input =
    Parser.run puzzleParser input


puzzleParser : Parser Puzzle
puzzleParser =
    Parser.succeed
        { grid = Array.empty
        , clues = []
        , metadata =
            { title = Nothing
            , author = Nothing
            , editor = Nothing
            , date = Nothing
            }
        , notes = Nothing
        }
