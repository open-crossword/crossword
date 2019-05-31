module Data.OneOrTwo exposing (OneOrTwo(..), mapOneOrTwo)


mapOneOrTwo : (a -> b) -> OneOrTwo a -> OneOrTwo b
mapOneOrTwo fn oneOrTwo =
    case oneOrTwo of
        One x ->
            One (fn x)

        Two x y ->
            Two (fn x) (fn y)


type OneOrTwo a
    = One a
    | Two a a
