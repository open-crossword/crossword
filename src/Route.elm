module Route exposing (fromUrl, Route(..))

import Url exposing (Url)

type Route =
    Root

fromUrl : Url -> Maybe Route
fromUrl url =
    Just Root
