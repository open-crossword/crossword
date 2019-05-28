module Data.Grid exposing (Grid, empty, fromList, get, height, map, mapNonEmpty, set, width)

import Array exposing (Array)


type Grid a
    = Grid
        { width : Int
        , height : Int
        , cells : Array (Maybe a)
        }


empty : Int -> Int -> Grid a
empty w h =
    Grid
        { width = max 0 w
        , height = max 0 h
        , cells = Array.repeat (max 0 w * max 0 h) Nothing
        }


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


get : Int -> Int -> Grid a -> Maybe a
get x y (Grid grid) =
    if x >= 0 && y >= 0 then
        Array.get (x + y * grid.width) grid.cells
            |> Maybe.andThen identity

    else
        Nothing


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
