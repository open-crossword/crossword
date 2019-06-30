module Data.Loadable exposing (Loadable(..), fromResult, toMaybe)

import Http


type Loadable x a
    = Loading
    | Failed x
    | Loaded a


toMaybe : Loadable x a -> Maybe a
toMaybe l =
    case l of
        Loaded a ->
            Just a

        _ ->
            Nothing


fromResult : Result x a -> Loadable x a
fromResult result =
    case result of
        Ok thing ->
            Loaded thing

        Err err ->
            Failed err
