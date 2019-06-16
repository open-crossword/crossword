module Session exposing (Session, init, navKey)

import Browser.Navigation as Nav


type Session
    = Session Nav.Key


init : Nav.Key -> Session
init key =
    Session key


navKey : Session -> Nav.Key
navKey (Session key) =
    key
