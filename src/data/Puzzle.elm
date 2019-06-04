module Data.Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle, WordStart, WordStartDirection(..), clueIdToString, getMatchingClueId)

import Data.Direction as Direction exposing (Direction(..))
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo exposing (OneOrTwo(..))
import Data.Point exposing (Point)
import Dict exposing (Dict)


type alias CellIndex =
    Int


type alias Puzzle =
    { notes : Maybe String
    , metadata : Metadata
    , grid : Grid Cell
    , clues : Dict String Clue
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
    = Across
    | Down
    | Both


type alias WordStart =
    { point : Point, direction : WordStartDirection, clueNumber : Int }


clueIdToString : ClueId -> String
clueIdToString { direction, number } =
    Direction.toString direction ++ String.fromInt number


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
