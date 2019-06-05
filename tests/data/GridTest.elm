module GridTest exposing (suite)

import Data.Grid as Grid
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Test exposing (..)


sampleTwoByTwoGrid =
    Grid.fromList 2 2 [ 1, 2, 3, 4 ]
        |> Maybe.withDefault (Grid.empty 0 0)


suite : Test
suite =
    describe "The grid module"
        [ describe "Grid.empty"
            [ test "creates a grid with the desired dimensions" <|
                \_ ->
                    Grid.empty 5 10
                        |> Expect.all
                            [ Grid.width >> Expect.equal 5
                            , Grid.height >> Expect.equal 10
                            ]
            , test "doesn't create a negatively sized grid" <|
                \_ ->
                    Grid.empty -2 -2
                        |> Expect.all
                            [ Grid.width >> Expect.equal 0
                            , Grid.height >> Expect.equal 0
                            ]
            ]
        , describe "Grid.fromList"
            [ test "creates a grid if the width and height are valid" <|
                \_ ->
                    Grid.fromList 2 2 [ 1, 2, 3, 4 ]
                        |> Expect.notEqual Nothing
            , test "does not create a grid if the width and height are invalid" <|
                \_ ->
                    Grid.fromList 0 0 [ 1, 2, 3, 4 ]
                        |> Expect.equal Nothing
            ]
        , describe "Grid.get"
            [ test "returns Nothing on an empty grid" <|
                \_ ->
                    Grid.empty 2 2
                        |> Grid.get ( 0, 0 )
                        |> Expect.equal Nothing
            , test "returns Nothing if given a too-big index (1)" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.get ( 2, 0 )
                        |> Expect.equal Nothing
            , test "returns Nothing if given a too-big index (2)" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.get ( 3, 1 )
                        |> Expect.equal Nothing
            , test "returns Nothing if given a negative index" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.get ( -1, 1 )
                        |> Expect.equal Nothing
            , test "can get a thing from the grid" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.get ( 0, 0 )
                        |> Expect.equal (Just 1)
            , test "understands x index" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.get ( 1, 0 )
                        |> Expect.equal (Just 2)
            , test "understands y index" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.get ( 0, 1 )
                        |> Expect.equal (Just 3)
            , test "understands x and y indices" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.get ( 1, 1 )
                        |> Expect.equal (Just 4)
            ]

        -- TODO test above, etc
        , describe "Grid.set"
            [ test "can set a value in an empty grid" <|
                \_ ->
                    Grid.empty 2 2
                        |> Grid.set ( 0, 0 ) 10
                        |> Grid.get ( 0, 0 )
                        |> Expect.equal (Just 10)
            , test "can set a value in a sample grid" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.set ( 1, 0 ) -5
                        |> Grid.get ( 1, 0 )
                        |> Expect.equal (Just -5)
            ]
        , describe "Grid.map"
            [ test "can map a sample grid" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.map (Maybe.map String.fromInt)
                        |> Grid.get ( 1, 1 )
                        |> Expect.equal (Just "4")
            ]
        , describe "Grid.mapNonEmpty"
            [ test "can map a sample grid" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.mapNonEmpty String.fromInt
                        |> Grid.get ( 1, 1 )
                        |> Expect.equal (Just "4")
            ]
        , describe "Grid.from2DList"
            [ test "can create a Grid from nested lists" <|
                \_ ->
                    Grid.from2DList [ [ 1, 2 ], [ 3, 4 ] ]
                        |> Expect.equal (Just sampleTwoByTwoGrid)
            , test "makes an empty list of dimensions 0 ✕ 0" <|
                \_ ->
                    Grid.from2DList []
                        |> Expect.equal (Just (Grid.empty 0 0))
            , test "collapses empty grids" <|
                \_ ->
                    Grid.from2DList
                        [ []
                        ]
                        |> Expect.equal (Just (Grid.empty 0 1))
            , test "fails when given a ragged list" <|
                \_ ->
                    Grid.from2DList
                        [ [ 1, 2 ]
                        , [ 4 ]
                        ]
                        |> Expect.equal Nothing
            ]
        , describe "Grid.indexedMap"
            [ test "can indexedMap a simple grid" <|
                \_ ->
                    sampleTwoByTwoGrid
                        |> Grid.indexedMap (\( x, y ) _ -> Just ( x, y ))
                        |> Just
                        |> Expect.equal
                            (Grid.from2DList
                                [ [ ( 0, 0 ), ( 1, 0 ) ]
                                , [ ( 0, 1 ), ( 1, 1 ) ]
                                ]
                            )
            , test "can indexedMap a different grid" <|
                \_ ->
                    Grid.from2DList
                        [ [ 1, 1, 1 ]
                        , [ 1, 1, 1 ]
                        ]
                        |> Maybe.map (Grid.indexedMap (\( x, y ) z -> Just ( x, y )))
                        |> Expect.equal
                            (Grid.from2DList
                                [ [ ( 0, 0 ), ( 1, 0 ), ( 2, 0 ) ]
                                , [ ( 0, 1 ), ( 1, 1 ), ( 2, 1 ) ]
                                ]
                            )
            ]

        -- , describe "Grid.to2DList"
        --     [ test "can roundtrip [[]]" <|
        --         \_ ->
        --             [ []
        --             ]
        --                 |> Grid.from2DList
        --                 |> Maybe.map Grid.to2DList
        --                 |> (\maybe ->
        --                         case maybe of
        --                             Just value ->
        --                                 Expect.equal value [ [] ]
        --                             Nothing ->
        --                                 Expect.pass
        --                    )
        -- , fuzz (list (list int)) "is the inverse of Grid.from2DList" <|
        --     \random2DList ->
        --         random2DList
        --             |> Grid.from2DList
        --             |> Maybe.map (Grid.to2DList >> List.map (List.filterMap identity))
        --             |> (\maybe ->
        --                     case maybe of
        --                         Just value ->
        --                             Expect.equal value random2DList
        --                         Nothing ->
        --                             Expect.pass
        --                )
        -- ]
        ]
