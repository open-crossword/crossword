module Data.Direction exposing (Direction(..), swap, toString)


type Direction
    = Across
    | Down


swap : Direction -> Direction
swap dir =
    case dir of
        Across ->
            Down

        Down ->
            Across


toString : Direction -> String
toString direction =
    case direction of
        Across ->
            "A"

        Down ->
            "D"


