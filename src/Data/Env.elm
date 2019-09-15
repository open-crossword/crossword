module Data.Env exposing (Env(..), decode)

import Json.Decode as Decode exposing (Value)


type Env
    = Dev
    | Prod


decode : Decode.Decoder Env
decode =
    Decode.bool
        |> Decode.map
            (\isProd ->
                if isProd then
                    Prod

                else
                    Dev
            )
