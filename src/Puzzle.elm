module Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle, parse)

import Data.Direction exposing (Direction(..))
import Data.Grid as Grid exposing (Grid)
import Dict exposing (Dict)
import Parser exposing (..)


type alias Puzzle =
    { notes : Maybe String
    , metadata : Metadata
    , grid : Grid Cell
    , clues : List Clue
    }


type alias Clue =
    { id : ClueId
    , clue : String
    , answer : String
    }


type alias ClueId =
    { direction : Direction
    , number : Int
    }


type alias Metadata =
    { title : Maybe String
    , author : Maybe String
    , editor : Maybe String
    , date : Maybe String
    }


type Cell
    = Shaded
    | Letter Char (Maybe ClueId)


type UnannotatedCell
    = Shaded_
    | Letter_ Char


type alias UnannotatedGrid =
    Grid UnannotatedCell


parse : String -> Result (List Parser.DeadEnd) Puzzle
parse input =
    -- adding this newline because parsers are hard
    run puzzle (input ++ "\n")


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


grid : Parser (Grid Cell)
grid =
    let
        rawGrid : Parser UnannotatedGrid
        rawGrid =
            loopUntil "\n\n" (\x -> x |= line)
                |> map Grid.from2DList
                |> andThen
                    (maybeToParserOrError
                        "ran into a problem trying to parse the grid"
                    )
    in
    map annotate rawGrid


annotate : UnannotatedGrid -> Grid Cell
annotate rawGrid =
    -- TODO psudocode for the annotation algorithm
    -- ix = 0
    -- for cell in cells
    --     left = cellLeftOf cell
    --     up = cellAbove cell
    --     if (left is Shaded) or (up is Shaded):
    --        ix ++
    --        cell.number = ix
    rawGrid
        |> Grid.mapNonEmpty
            (\cell_ ->
                case cell_ of
                    Letter_ char ->
                        Letter char Nothing

                    Shaded_ ->
                        Shaded
            )


line : Parser (List UnannotatedCell)
line =
    loopUntil "\n"
        (\x -> x |= cell)


cell : Parser UnannotatedCell
cell =
    oneOf
        [ character |> map (\x -> Letter_ x)
        , symbol "#" |> map (always Shaded_)
        ]


character : Parser Char
character =
    (succeed String.uncons
        |= (getChompedString <| chompIf Char.isAlphaNum)
    )
        |> andThen
            (maybeToParserOrError
                "No character found!"
            )
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


clueIndex : Parser ClueId
clueIndex =
    let
        -- couldn't get the built-in `int` to tolerate trailing non-digits for some reason
        relaxedInt : Parser Int
        relaxedInt =
            (succeed String.toInt
                |= (getChompedString <| chompWhile Char.isDigit)
            )
                |> andThen (maybeToParserOrError "Expected int")

        helper : String -> (Int -> ClueId) -> Parser ClueId
        helper prefix toClueId =
            succeed toClueId
                |. symbol prefix
                |= relaxedInt
                |. symbol "."
                |. spaces
    in
    oneOf
        [ helper "A" (ClueId Across)
        , helper "D" (ClueId Down)
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


maybeToParserOrError : String -> Maybe a -> Parser a
maybeToParserOrError label maybe =
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
