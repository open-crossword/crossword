module Puzzle exposing (Puzzle)

import Array exposing (Array)


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
