module Data.Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle)
import Data.Direction exposing (Direction(..))
import Data.Grid as Grid exposing (Grid)
import Data.OneOrTwo exposing (OneOrTwo(..))
import Dict exposing (Dict)

type alias Puzzle =
    { notes : Maybe String
    , metadata : Metadata
    , grid : Grid Cell
    , clues : Dict ClueId Clue
    }


type alias Clue =
    { id : ClueId
    , clue : String
    , answer : String
    , direction : Direction
    , number : Int
    }


type alias ClueId =
    String


type alias Metadata =
    { title : Maybe String
    , author : Maybe String
    , editor : Maybe String
    , date : Maybe String
    }


type Cell
    = Shaded
    | Letter Char (Maybe (OneOrTwo ClueId))
