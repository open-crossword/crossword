module Puzzle.Format.Xd exposing (parse)

import Data.Direction as Direction exposing (Direction)
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo as OneOrTwo exposing (OneOrTwo(..))
import Data.Point exposing (Point)
import Data.Puzzle as Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle, WordStart, WordStartDirection(..))
import Dict exposing (Dict)
import Parser exposing (..)


parse : String -> Result (List Parser.DeadEnd) Puzzle
parse input =
    -- adding this newline because parsers are hard
    run puzzle (input ++ "\n")


puzzle : Parser Puzzle
puzzle =
    let
        buildPuzzle =
            \metadata_ grid_ clues_ cluesForCell_ ->
                { notes = Just ""
                , metadata = metadata_
                , grid = grid_
                , clues = clues_
                , cluesForCell = cluesForCell_
                , wordStarts = wordStarts grid_
                }
    in
    succeed buildPuzzle
        |= metadata
        |= grid
        |= cluesDict
        |= succeed Dict.empty



-- TODO
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
        rawGrid : Parser (Grid Cell)
        rawGrid =
            loopUntil "\n\n" (\x -> x |= line)
                |> map Grid.from2DList
                |> andThen
                    (maybeToParserOrError
                        "ran into a problem trying to parse the grid"
                    )
    in
    Parser.map annotate rawGrid


annotate : Grid Cell -> Grid Cell
annotate rawGrid =
    rawGrid



-- wordStarts rawGrid
-- |> labelByIndex rawGrid
-- |> associateCellsByClueId
-- labelByIndex : Grid Cell ->  List WordStart -> Grid Cell
-- associateCellsByClueId : Grid Cell -> ??? -> Grid Cell


wordStarts : Grid Cell -> List WordStart
wordStarts grid_ =
    let
        isShaded =
            Maybe.map (\c -> c == Shaded)
                >> Maybe.withDefault True

        isAcrossStart : Point -> Bool
        isAcrossStart point =
            (grid_ |> Grid.leftOf point |> isShaded)
                && (grid_ |> Grid.rightOf point |> (not << isShaded))

        isDownStart : Point -> Bool
        isDownStart point =
            let
                above =
                    grid_ |> Grid.above point |> isShaded

                below =
                    grid_ |> Grid.below point |> (not << isShaded)
            in
            above && below

        helper : ( Point, Maybe Cell ) -> (List WordStart, Int) -> (List WordStart, Int)
        helper ( point, theCell ) (acc, num) =
            case ( isShaded theCell, isAcrossStart point, isDownStart point ) of
                ( False, True, True ) ->
                    (WordStart point Both (num) :: acc, num + 1)

                ( False, False, True ) ->
                    (WordStart point Down (num) :: acc, num + 1)

                ( False, True, False ) ->
                    (WordStart point Across (num) :: acc, num + 1)

                ( _, _, _ ) ->
                    (acc, num)
    in
    Grid.foldlIndexed helper ([], 1) grid_
        |> Tuple.first
        |> List.reverse


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
        |> andThen
            (maybeToParserOrError
                "No character found!"
            )
        |> map Tuple.first



--- CLUES ---


cluesDict : Parser (Dict String Clue)
cluesDict =
    cluesList
        |> Parser.map
            (\clues ->
                clues
                    |> List.map (\clue -> ( Puzzle.clueIdToString clue.id, clue ))
                    |> Dict.fromList
            )


cluesList : Parser (List Clue)
cluesList =
    let
        helper x =
            x
                |. spaces
                |= clueLine
    in
    loopUntil "\n\n\n" helper


clueLine : Parser Clue
clueLine =
    let
        buildClue ( direction, number ) txt answer =
            { id = ClueId direction number
            , clue = txt
            , answer = answer
            }
    in
    succeed buildClue
        |= clueIndex
        |= clueText
        |= clueAnswer


clueIndex : Parser ( Direction, Int )
clueIndex =
    let
        -- couldn't get the built-in `int` to tolerate trailing non-digits for some reason
        relaxedInt : Parser Int
        relaxedInt =
            (succeed String.toInt
                |= (getChompedString <| chompWhile Char.isDigit)
            )
                |> andThen (maybeToParserOrError "Expected int")

        helper : String -> (Int -> ( Direction, Int )) -> Parser ( Direction, Int )
        helper prefix buildClueId =
            succeed buildClueId
                |. symbol prefix
                |= relaxedInt
                |. symbol "."
                |. spaces
    in
    oneOf
        [ helper "A" (Tuple.pair Direction.Across)
        , helper "D" (Tuple.pair Direction.Down)
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
