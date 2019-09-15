module Http.Api exposing (makeUrl)

import Data.Env as Env exposing (Env)
import Url.Builder exposing (..)


makeUrl : Env -> List String -> List QueryParameter -> String
makeUrl env =
    case env of
        Env.Dev ->
            crossOrigin "http://localhost:8080"

        Env.Prod ->
            absolute
