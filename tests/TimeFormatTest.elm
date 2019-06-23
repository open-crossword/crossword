module TimeFormatTest exposing (suite)

import Data.TimeFormat as TimeFormat
import Expect
import Test exposing (..)


suite : Test
suite =
    describe "The TimeFormat Module"
        [ describe "TimeFormat.formatSeconds"
            [ test "formats 0s" <|
                \_ ->
                    TimeFormat.formatSeconds 0
                        |> Expect.equal "0:00"
            , test "formats 1s" <|
                \_ ->
                    TimeFormat.formatSeconds 1
                        |> Expect.equal "0:01"
            , test "formats 10s" <|
                \_ ->
                    TimeFormat.formatSeconds 10
                        |> Expect.equal "0:10"
            , test "formats 60s" <|
                \_ ->
                    TimeFormat.formatSeconds 60
                        |> Expect.equal "1:00"
            , test "formats 66s" <|
                \_ ->
                    TimeFormat.formatSeconds 66
                        |> Expect.equal "1:06"
            , test "formats 70s" <|
                \_ ->
                    TimeFormat.formatSeconds 70
                        |> Expect.equal "1:10"
            , test "formats 3600s" <|
                \_ ->
                    TimeFormat.formatSeconds 3600
                        |> Expect.equal "1:00:00"
            , test "formats 3660s" <|
                \_ ->
                    TimeFormat.formatSeconds 3660
                        |> Expect.equal "1:01:00"
            , test "formats 4217s" <|
                \_ ->
                    TimeFormat.formatSeconds 4217
                        |> Expect.equal "1:10:17"
            ]
        ]
