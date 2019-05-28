module Data.Direction exposing (Direction(..), swap)


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
