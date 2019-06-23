module Data.Loadable exposing (Loadable(..), fromHttpResult, toMaybe)

import Http exposing (Error)


type Loadable a
    = Loading
    | Failed Error
    | Loaded a


toMaybe : Loadable a -> Maybe a
toMaybe l =
    case l of
        Loaded a ->
            Just a

        _ ->
            Nothing


fromHttpResult : Result Error a -> Loadable a
fromHttpResult result =
    case result of
        Ok thing ->
            Loaded thing

        Err err ->
            Failed err
