module Puzzle exposing (Cell(..), Grid, Metadata, Puzzle, parse, Clue, Index)

import Array exposing (Array)
import Dict exposing (Dict)
import Parser exposing (..)


type alias Grid =
    List (List Cell)


type alias Puzzle =
    { notes : Maybe String
    , metadata : Metadata
    , grid : Grid
    , clues : List Clue
    }


type alias Clue =
    { index : Index
    , clue : String
    , answer : String
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
    run puzzle input


puzzle : Parser Puzzle
puzzle =
    succeed (Puzzle Nothing)
        |= metadata
        |= grid
        |= clues


metadata : Parser Metadata
metadata =
    metadataPairs
        |> map Dict.fromList
        |> map dictToMetadata


metadataPairs : Parser (List ( String, String ))
metadataPairs =
    loopUntil "\n\n"
        (\x -> x |= metadataLine |. symbol "\n")


dictToMetadata : Dict String String -> Metadata
dictToMetadata dict =
    { author = Dict.get "Author" dict
    , title = Dict.get "Title" dict
    , editor = Dict.get "Editor" dict
    , date = Dict.get "Date" dict
    }


metadataLine : Parser ( String, String )
metadataLine =
    succeed Tuple.pair
        |. spaces
        |= (whileNot ':')
        |. (symbol ":")
        |. spaces
        |= (readUntil "\n")


whileNot : Char -> Parser String
whileNot stoppingPoint =
    getChompedString <|
        succeed ()
            |. Parser.chompWhile (\c -> c /= stoppingPoint)


readUntil : String -> Parser String
readUntil stoppingPoint =
    getChompedString <|
        succeed ()
            |. chompUntil stoppingPoint


grid : Parser Grid
grid =
    loopUntil "\n\n"
        (\x -> x |= line)


line : Parser (List Cell)
line =
    loopUntil "\n"
        (\x -> x |= cell)


cell : Parser Cell
cell =
    oneOf
        [ character |> map (\x -> Letter x)
        , symbol "#" |> map (always Shaded)
        ]


character : Parser Char
character =
    (getChompedString <|
        succeed ()
            |. chompIf Char.isAlphaNum
    )
        |> andThen
            (\s ->
                case String.uncons s of
                    Just ( first, _ ) ->
                        succeed first

                    Nothing ->
                        problem "No character found!"
            )


clues : Parser (List Clue)
clues =
    loopUntil "\n\n"
        (\x -> x |. spaces |= clueLine)


clueLine : Parser Clue
clueLine =
    succeed Clue
        |= clueIndex
        |= clueText
        |= clueAnswer


clueIndex : Parser Index
clueIndex =
    let
        myInt : Parser Int
        myInt =
            (getChompedString <|
                succeed ()
                    |. chompWhile (\c -> Char.isDigit c)
            )
                |> andThen
                    (\s ->
                        case String.toInt s of
                            Just i ->
                                succeed i

                            Nothing ->
                                problem "expecting an int"
                    )

        helper : String -> (Int -> Index) -> Parser Index
        helper prefix toIndex =
            succeed toIndex
                |. symbol prefix
                |= myInt
                |. spaces
                |. symbol "."
                |. spaces
    in
    oneOf
        [ helper "A" Across
        , helper "D" Down
        ]


clueText : Parser String
clueText =
    readUntil " ~"


clueAnswer : Parser String
clueAnswer =
    succeed identity
        |. spaces
        |. symbol "~"
        |. spaces
        |= whileNot '\n'


loopUntil endToken foo =
    let
        helper revStmts =
            oneOf
                [ symbol endToken
                    |> map (\_ -> Parser.Done (List.reverse revStmts))
                , succeed (\pair -> Parser.Loop (pair :: revStmts))
                    |> foo
                ]
    in
    loop [] helper
