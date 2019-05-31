module Data.Grid exposing (Grid, empty, foldlIndexed, from2DList, fromList, get, height, indexedMap, map, mapNonEmpty, set, to2DList, width)

import Array exposing (Array)
import List.Extra


type Grid a
    = Grid
        { width : Int
        , height : Int
        , cells : Array (Maybe a)
        }


{-| an empty Grid with the given width and height
unless you later set the values in the Grid, attempts to get them will return Nothing
negative dimensions will be treated as zero
-}
empty : Int -> Int -> Grid a
empty w h =
    Grid
        { width = max 0 w
        , height = max 0 h
        , cells = Array.repeat (max 0 w * max 0 h) Nothing
        }


{-| Creates a Grid from a flat list and a width and height

returns `Nothing` in the following cases

  - the supplied list is the wrong length (the list's length must equal the given width times the height)
  - either the width or the height is less than zero

-}
fromList : Int -> Int -> List a -> Maybe (Grid a)
fromList w h list =
    if w >= 0 && h >= 0 && List.length list == w * h then
        Just
            (Grid
                { width = w
                , height = h
                , cells = Array.fromList (List.map Just list)
                }
            )

    else
        Nothing


{-| Creates a Grid from a nested-list representation

returns Nothing in the following cases:

  - the rows are of uneven lengths

if either dimension is 0 then the Grid is of dimensions 0, 0

-}
from2DList : List (List a) -> Maybe (Grid a)
from2DList rows =
    let
        rowLengths =
            List.map List.length rows

        height_ : List (List a) -> Maybe Int
        height_ r =
            Just (List.length r)

        width_ : List (List a) -> Maybe Int
        width_ r =
            case r of
                [] ->
                    Just 0

                a :: [] ->
                    Just (List.length a)

                x :: xs ->
                    if Just (List.length x) == width_ xs then
                        Just (List.length x)

                    else
                        Nothing
    in
    case ( width_ rows, height_ rows ) of
        ( Just w, Just h ) ->
            rows
                |> List.concat
                |> fromList w h

        ( _, _ ) ->
            Nothing


{-| gets the cell at the given x, y coordinates
Returns Nothing in the following cases

  - either x or y is less than zero or greater than the width or height of the Grid respectively
  - the cell you attempted to get was never set or initialized

-}
get : Int -> Int -> Grid a -> Maybe a
get x y (Grid grid) =
    if x >= 0 && y >= 0 then
        Array.get (x + y * grid.width) grid.cells
            |> Maybe.andThen identity

    else
        Nothing


{-| sets the cell at the given x, y coordinates
attempts to set out-of-bound cells will have no effect
-}
set : Int -> Int -> a -> Grid a -> Grid a
set x y value (Grid grid) =
    Grid
        { width = grid.width
        , height = grid.height
        , cells = Array.set (x + y * grid.width) (Just value) grid.cells
        }


width : Grid a -> Int
width (Grid grid) =
    grid.width


height : Grid a -> Int
height (Grid grid) =
    grid.height


map : (Maybe a -> Maybe b) -> Grid a -> Grid b
map fn (Grid grid) =
    Grid
        { width = grid.width
        , height = grid.height
        , cells = Array.map fn grid.cells
        }


mapNonEmpty : (a -> b) -> Grid a -> Grid b
mapNonEmpty fn grid =
    map (Maybe.map fn) grid


indexedMap : (( Int, Int ) -> Maybe a -> Maybe b) -> Grid a -> Grid b
indexedMap fn (Grid grid) =
    Grid
        { width = grid.width
        , height = grid.height
        , cells = Array.indexedMap (\ix c -> fn ( ix // grid.width, modBy grid.width ix ) c) grid.cells
        }


foldlIndexed : (( ( Int, Int ), Maybe a ) -> acc -> acc) -> acc -> Grid a -> acc
foldlIndexed fn acc (Grid grid) =
    grid.cells
        |> Array.toIndexedList
        |> List.foldl (\( index, cell ) acc2 -> fn ( ( index // grid.width, modBy grid.width index ), cell ) acc2) acc


{-| Inverse of from2DList
the (Maybe a) is because cells can be uninitialized
-}
to2DList : Grid a -> List (List (Maybe a))
to2DList (Grid grid) =
    List.Extra.groupsOf grid.width (Array.toList grid.cells)



-- loc = x + y * width
-- loc - (y * width) = x
-- TODO
-- mapIndexed : (((Int, Int), Maybe a) -> Maybe b) -> Grid a -> Grid b
-- foldl: (Maybe a -> acc -> acc) -> acc -> Grid a -> acc
