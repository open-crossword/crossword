module Data.Point exposing (Point, equals)


type alias Point =
    ( Int, Int )


equals : Point -> Point -> Bool
equals one two =
    (Tuple.first one == Tuple.first two) && (Tuple.second one == Tuple.second two)
