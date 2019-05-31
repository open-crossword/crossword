module Data.OneOrTwo exposing (OneOrTwo(..), map, firstValue)


firstValue : OneOrTwo a -> a
firstValue oneOrTwo =
    case oneOrTwo of
        One x ->
            x

        Two x _ ->
            x


map : (a -> b) -> OneOrTwo a -> OneOrTwo b
map fn oneOrTwo =
    case oneOrTwo of
        One x ->
            One (fn x)

        Two x y ->
            Two (fn x) (fn y)


type OneOrTwo a
    = One a
    | Two a a
