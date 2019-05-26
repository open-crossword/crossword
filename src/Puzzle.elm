module Puzzle exposing (Grid, Metadata, Puzzle, parse)

import Array exposing (Array)
import Dict exposing (Dict)
import Parser exposing (..)


type alias Grid =
    Array (Array Cell)


type alias Puzzle =
    { clues : List Clue
    , notes : Maybe String
    , metadata : Metadata
    , grid : Grid
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
    Parser.succeed (Puzzle [] Nothing)
        |= metadata
        |= grid


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
                [ symbol "\n\n"
                    |> map (\_ -> Parser.Done (List.reverse revStmts))
                , succeed (\pair -> Parser.Loop (pair :: revStmts))
                    |= metadataLineParser
                    |. symbol "\n"
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


grid : Parser Grid
grid =
    let
        helper lines =
            oneOf
                [ symbol "\n\n"
                    |> map (\_ -> Parser.Done (List.reverse lines))
                , succeed (\l -> Parser.Loop (l :: lines))
                    |= line
                ]
    in
    loop [] helper
        |> Parser.map Array.fromList


line : Parser (Array Cell)
line =
    let
        helper cells =
            oneOf
                [ succeed (\c -> Parser.Loop (c :: cells))
                    |= cell
                , symbol "\n"
                    |> map (\_ -> Parser.Done (List.reverse cells))
                ]
    in
    loop [] helper
        |> Parser.map Array.fromList


cell : Parser Cell
cell =
    Parser.oneOf
        [ character |> Parser.map (\x -> Letter x)
        , symbol "#" |> Parser.map (always Shaded)
        ]


character : Parser Char
character =
    let
        foo : String -> Parser Char
        foo s =
            case String.uncons s of
                Just ( first, _ ) ->
                    succeed first

                Nothing ->
                    problem "No character found!"
    in
    (getChompedString <|
        succeed ()
            |. chompIf Char.isAlphaNum
    )
        |> Parser.andThen foo
