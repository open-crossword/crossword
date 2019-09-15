module Session exposing (Session, collapseMenu, init, navKey, toggleMenuCollapsed)

import Browser.Navigation as Nav
import Data.Env as Env exposing (Env)
import Json.Decode as Decode exposing (Value)


type alias Session =
    { navKey : Nav.Key
    , menuCollapsed : Bool
    , probablyMobile : Bool
    , env : Env
    }


init : Nav.Key -> Value -> Session
init key flags =
    { navKey = key
    , menuCollapsed = True
    , probablyMobile =
        flags
            |> Decode.decodeValue (Decode.field "isProbablyMobile" Decode.bool)
            |> Result.withDefault False
    , env =
        flags
            |> Decode.decodeValue (Decode.field "isProd" Env.decode)
            |> Result.withDefault Env.Dev
    }


navKey : { a | navKey : Nav.Key } -> Nav.Key
navKey record =
    record.navKey


toggleMenuCollapsed : Session -> Session
toggleMenuCollapsed session =
    { session | menuCollapsed = not session.menuCollapsed }


collapseMenu : Session -> Session
collapseMenu session =
    { session | menuCollapsed = True }
