module Data.Puzzle.Id exposing (PuzzleId, fromString, toString)


type PuzzleId
    = PuzzleId String


fromString : String -> PuzzleId
fromString s =
    PuzzleId s


toString : PuzzleId -> String
toString (PuzzleId s) =
    s
