module Session exposing (Session, collapseMenu, init, navKey, toggleMenuCollapsed)

import Browser.Navigation as Nav


type alias Session =
    { navKey : Nav.Key
    , menuCollapsed : Bool
    }


init : Nav.Key -> Session
init key =
    { navKey = key
    , menuCollapsed = True
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
