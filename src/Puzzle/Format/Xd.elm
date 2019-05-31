module Puzzle.Format.Xd exposing (parse)

import Data.Direction as Direction exposing (Direction(..))
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo exposing (OneOrTwo(..))
import Data.Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle)
import Dict exposing (Dict)
import Parser exposing (..)


parse : String -> Result (List Parser.DeadEnd) Puzzle
parse input =
    -- adding this newline because parsers are hard
    run puzzle (input ++ "\n")


isAnnotated : Cell -> Bool
isAnnotated cell_ =
    case cell_ of
        Shaded ->
            False

        Letter _ Nothing ->
            False

        Letter _ (Just _) ->
            True


puzzle : Parser Puzzle
puzzle =
    succeed (Puzzle Nothing)
        |= metadata
        |= grid
        |= cluesDict



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
    map annotate rawGrid


annotate : Grid Cell -> Grid Cell
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
        |> Grid.foldlIndexed
            (\( ( y, x ), cell_ ) ( clueNumber, currentGrid ) ->
                let
                    up =
                        Grid.get ( x, y - 1 ) rawGrid

                    left =
                        Grid.get ( x - 1, y ) rawGrid

                    isShaded =
                        Maybe.map (\it -> it == Shaded) >> Maybe.withDefault True

                    newCell =
                        case ( isShaded up, isShaded left, cell_ ) of
                            -- TODO: most cells have Two clueIds
                            ( False, True, Just (Letter char _) ) ->
                                Letter char (Just (One (clueIdFromDirectionNumber Across clueNumber)))

                            ( True, False, Just (Letter char _) ) ->
                                Letter char (Just (One (clueIdFromDirectionNumber Down clueNumber)))

                            ( True, True, Just (Letter char _) ) ->
                                Letter char (Just (One (clueIdFromDirectionNumber Down clueNumber)))

                            ( _, _, Just (Letter char _) ) ->
                                Letter char Nothing

                            ( _, _, _ ) ->
                                Shaded
                in
                if isAnnotated newCell then
                    ( clueNumber + 1, Grid.set ( x, y ) newCell currentGrid )

                else
                    ( clueNumber, currentGrid )
            )
            -- Acc = (Clue Number, Current Grid)
            ( 1, rawGrid )
        |> Tuple.second


line : Parser (List Cell)
line =
    loopUntil "\n"
        (\x -> x |= cell)


cell : Parser Cell
cell =
    oneOf
        [ character |> map (\x -> Letter x Nothing)
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


cluesDict : Parser (Dict ClueId Clue)
cluesDict =
    cluesList
        |> Parser.map
            (\clues ->
                clues
                    |> List.map (\clue -> ( clue.id, clue ))
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
            { id = clueIdFromDirectionNumber direction number
            , clue = txt
            , answer = answer
            , direction = direction
            , number = number
            }
    in
    succeed buildClue
        |= clueIndex
        |= clueText
        |= clueAnswer


clueIdFromDirectionNumber : Direction -> Int -> ClueId
clueIdFromDirectionNumber direction number =
    Direction.toString direction ++ String.fromInt number


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
        [ helper "A" (Tuple.pair Across)
        , helper "D" (Tuple.pair Down)
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
