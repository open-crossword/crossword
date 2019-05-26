module Puzzle exposing (Puzzle, parse, Metadata)

import Array exposing (Array)
import Parser exposing ((|.), (|=), Parser)


type alias Puzzle =
    { clues : List Clue
    , grid : Array (Array Cell)
    , notes : Maybe String
    , metadata : Metadata
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
    Parser.succeed (Puzzle [] Array.empty Nothing)
        |= metadataParser


metadataParser : Parser Metadata
metadataParser =
    Parser.succeed Metadata
        |= metadataLineParser "Title"
        |= metadataLineParser "Author"
        |= metadataLineParser "Editor"
        |= metadataLineParser "Date"


metadataLineParser : String -> Parser (Maybe String)
metadataLineParser key =
    Parser.oneOf
        [ (Parser.succeed Just
            |. Parser.spaces
            |. Parser.symbol key
            |. Parser.symbol ":"
            |. Parser.spaces
            |= remainder
          )
        , Parser.succeed Nothing
        ]


remainder : Parser String
remainder =
    Parser.getChompedString <|
        Parser.succeed ()
            |. Parser.chompWhile (\c -> c /= '\n')
