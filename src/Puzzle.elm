module Puzzle exposing (Metadata, Puzzle, parse)

import Array exposing (Array)
import Dict exposing (Dict)
import Parser exposing (..)


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
    Parser.run puzzle input


puzzle : Parser Puzzle
puzzle =
    Parser.succeed (Puzzle [] Array.empty Nothing)
        |= metadata


metadata : Parser Metadata
metadata =
    metadataPairs
        |> Parser.map Dict.fromList
        |> Parser.map dictToMetadata


metadataPairs : Parser (List ( String, String ))
metadataPairs =
    let
        helper revStmts =
            oneOf
                [ succeed (\pair -> Parser.Loop (pair :: revStmts))
                    |= metadataLineParser
                    |. symbol "\n"
                , succeed ()
                    |> map (\_ -> Parser.Done (List.reverse revStmts))
                ]
    in
    loop [] helper


dictToMetadata : Dict String String -> Metadata
dictToMetadata dict =
    { author = Dict.get "Author" dict
    , title = Dict.get "Title" dict
    , editor = Dict.get "Editor" dict
    , date = Dict.get "Date" dict
    }


metadataLineParser : Parser ( String, String )
metadataLineParser =
    Parser.succeed Tuple.pair
        |. Parser.backtrackable Parser.spaces
        |= Parser.backtrackable (whileNot ':')
        |. Parser.backtrackable Parser.spaces
        |= Parser.backtrackable (untilNot "\n")


whileNot : Char -> Parser String
whileNot stoppingPoint =
    Parser.getChompedString <|
        Parser.succeed ()
            |. Parser.chompWhile (\c -> c /= stoppingPoint)


untilNot : String -> Parser String
untilNot stoppingPoint =
    Parser.getChompedString <|
        Parser.succeed ()
            |. Parser.chompUntil stoppingPoint



-- remainder : Parser String
-- remainder =
--     Parser.getChompedString <|
--         Parser.succeed ()
--             |. Parser.chompWhile (\c -> c /= '\n')
