module Data.Direction exposing (Direction(..), fromChar, swap, toString)


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


fromChar : Char -> Maybe Direction
fromChar char =
    case char of
        'A' ->
            Just Across

        'D' ->
            Just Down

        _ ->
            Nothing
