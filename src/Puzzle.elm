module Puzzle exposing (Cell(..), Clue, Grid, Index(..), Metadata, Puzzle, parse)

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



--- METADATA ---


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
        |= readUntil ":"
        |. symbol ":"
        |. spaces
        |= readUntil "\n"



--- GRID ---


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
    (succeed String.uncons
        |= (getChompedString <| chompIf Char.isAlphaNum)
    )
        |> andThen (maybeToParser "No character found!")
        |> map Tuple.first



--- CLUES ---


clues : Parser (List Clue)
clues =
    let
        helper x =
            x
                |. spaces
                |= clueLine
    in
    loopUntil "\n\n\n" helper


clueLine : Parser Clue
clueLine =
    succeed Clue
        |= clueIndex
        |= clueText
        |= clueAnswer


clueIndex : Parser Index
clueIndex =
    let
        -- couldn't get the build-in `int` to tolerate trailing non-digits for some reason
        relaxedInt : Parser Int
        relaxedInt =
            (succeed String.toInt
                |= (getChompedString <| chompWhile Char.isDigit)
            )
                |> andThen (maybeToParser "Expected int")

        helper : String -> (Int -> Index) -> Parser Index
        helper prefix toIndex =
            succeed toIndex
                |. symbol prefix
                |= relaxedInt
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
        |= readUntil "\n"



--- UTILS ---


maybeToParser : String -> Maybe a -> Parser a
maybeToParser label maybe =
    case maybe of
        Just x ->
            succeed x

        Nothing ->
            problem label


loopUntil endToken body =
    let
        helper revStmts =
            oneOf
                [ symbol endToken
                    |> map (\_ -> Parser.Done (List.reverse revStmts))
                , succeed (\pair -> Parser.Loop (pair :: revStmts))
                    |> body
                ]
    in
    loop [] helper


readUntil : String -> Parser String
readUntil stoppingPoint =
    getChompedString <|
        succeed ()
            |. chompUntil stoppingPoint
