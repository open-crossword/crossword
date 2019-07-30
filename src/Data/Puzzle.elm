module Data.Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle, WordStart, WordStartDirection(..), bundledId, clueIdToDisplayString, clueIdToIndex, getMatchingClueId, wordStartMatchesDirection)

import Data.Direction as Direction exposing (Direction)
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo exposing (OneOrTwo(..))
import Data.Point exposing (Point)
import Data.Puzzle.Id as PuzzleId exposing (PuzzleId)
import Dict exposing (Dict)


bundledId : Int -> PuzzleId
bundledId i =
    ("bundled_" ++ String.fromInt i)
        |> PuzzleId.fromString


type alias CellIndex =
    Int


type alias ClueIndex =
    String


type alias Puzzle =
    { id : PuzzleId
    , notes : Maybe String
    , metadata : Metadata
    , grid : Grid Cell
    , clues : Dict ClueIndex Clue
    , cluesForCell : Dict CellIndex (OneOrTwo ClueId)
    , wordStarts : List WordStart
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
    | Letter Char


type WordStartDirection
    = AcrossStart
    | DownStart
    | AcrossAndDownStart


type alias WordStart =
    { point : Point, direction : WordStartDirection, clueNumber : Int }


clueIdToIndex : ClueId -> ClueIndex
clueIdToIndex { direction, number } =
    Direction.toString direction ++ String.fromInt number


clueIdToDisplayString : ClueId -> String
clueIdToDisplayString { direction, number } =
    String.fromInt number ++ Direction.toString direction


getMatchingClueId : Direction -> OneOrTwo ClueId -> Maybe ClueId
getMatchingClueId direction clues =
    case clues of
        One clueId ->
            if direction == clueId.direction then
                Just clueId

            else
                Nothing

        Two clueIdOne clueIdTwo ->
            if direction == clueIdOne.direction then
                Just clueIdOne

            else if direction == clueIdTwo.direction then
                Just clueIdTwo

            else
                Nothing


wordStartMatchesDirection : WordStartDirection -> Direction -> Bool
wordStartMatchesDirection word dir =
    case ( word, dir ) of
        ( AcrossStart, Direction.Across ) ->
            True

        ( DownStart, Direction.Down ) ->
            True

        ( AcrossAndDownStart, Direction.Across ) ->
            True

        ( AcrossAndDownStart, Direction.Down ) ->
            True

        ( _, _ ) ->
            False
