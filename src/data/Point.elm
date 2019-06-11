module Data.Point exposing (Point, clamp, x, y)


type alias Point =
    ( Int, Int )


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
