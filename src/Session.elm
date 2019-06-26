module Session exposing (Session, init, navKey, toggleMenuCollapsed)

import Browser.Navigation as Nav


type alias Session =
    { navKey : Nav.Key
    , menuCollapsed : Bool
    }


init : Nav.Key -> Session
init key =
    { navKey = key
    , menuCollapsed = False
    }


navKey : { a | navKey : Nav.Key } -> Nav.Key
navKey record =
    record.navKey


toggleMenuCollapsed : Session -> Session
toggleMenuCollapsed session =
    { session | menuCollapsed = not session.menuCollapsed }
