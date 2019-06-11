module PointTest exposing (suite)

import Data.Point as Point
import Expect
import Test exposing (..)


suite : Test
suite =
    describe "The Point Module"
        [ describe "Point.x"
            [ test "returns first part of tuple" <|
                \_ ->
                    Point.x ( 1, 0 )
                        |> Expect.equal 1
            ]
        , describe "Point.y"
            [ test "returns first part of tuple" <|
                \_ ->
                    Point.y ( 1, 0 )
                        |> Expect.equal 0
            ]
        , describe "Point.clamp"
            [ test "sets to min if point is below min" <|
                \_ ->
                    Point.clamp ( 0, 0 ) ( 1, 1 ) ( -1, -1 )
                        |> Expect.equal ( 0, 0 )
            , test "sets to max if point is above max" <|
                \_ ->
                    Point.clamp ( 0, 0 ) ( 1, 1 ) ( 2, 2 )
                        |> Expect.equal ( 1, 1 )
            , test "sets x to max if only x is above max" <|
                \_ ->
                    Point.clamp ( 0, 0 ) ( 2, 2 ) ( 3, 1 )
                        |> Expect.equal ( 2, 1 )
            , test "sets y to max if only y is above max" <|
                \_ ->
                    Point.clamp ( 0, 0 ) ( 2, 2 ) ( 1, 3 )
                        |> Expect.equal ( 1, 2 )
            , test "sets x to min if only x is below min" <|
                \_ ->
                    Point.clamp ( 0, 0 ) ( 2, 2 ) ( -1, 1 )
                        |> Expect.equal ( 0, 1 )
            , test "sets y to min if only y is below min" <|
                \_ ->
                    Point.clamp ( 0, 0 ) ( 2, 2 ) ( 1, -1 )
                        |> Expect.equal ( 1, 0 )
            ]
        ]
