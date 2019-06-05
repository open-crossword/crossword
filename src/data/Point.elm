module Data.Point exposing (Point, equals, x, y)


type alias Point =
    ( Int, Int )


equals : Point -> Point -> Bool
equals one two =
    (x one == x two) && (y one == y two)


x : Point -> Int
x point =
    Tuple.first point


y : Point -> Int
y point =
    Tuple.second point
