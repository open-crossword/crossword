module PointTest exposing (suite)

import Data.Point as Point
import Expect
import Test exposing (..)


suite : Test
suite =
    describe "The Point Module"
        [ test "Point.x returns first part of tuple" <|
            \_ ->
                Point.x ( 1, 0 )
                    |> Expect.equal 1
        , test "Point.Y returns first part of tuple" <|
            \_ ->
                Point.y ( 1, 0 )
                    |> Expect.equal 0
        , test "Point.equal returns true for same x and y" <|
            \_ ->
                Point.equals ( 1, 0 ) ( 1, 0 )
                    |> Expect.true "Expected points to be equal!"
        , test "Point.equal returns false for differing xs" <|
            \_ ->
                Point.equals ( 1, 0 ) ( 2, 0 )
                    |> Expect.true "Expected points to be not equal!"
        , test "Point.equal returns false for differing ys" <|
            \_ ->
                Point.equals ( 1, 0 ) ( 1, 1 )
                    |> Expect.true "Expected points to be not equal!"
        ]
