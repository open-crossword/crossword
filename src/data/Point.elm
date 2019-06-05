module Data.Point exposing (Point, clamp, equals, x, y)


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


clamp : Point -> Point -> Point -> Point
clamp min max point =
    ( Basics.clamp (x min) (x max) (x point)
    , Basics.clamp (y min) (y max) (y point)
    )
