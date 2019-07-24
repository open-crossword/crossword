module Hammer exposing (Config, PanData, ZoomData, view)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (on)
import Json.Decode as Decode exposing (Decoder)


type alias Config msg =
    { onPan : PanData -> msg
    , onZoom : ZoomData -> msg
    }


type alias ZoomData =
    { scale : Float
    }


type alias PanData =
    { deltaX : Float
    , deltaY : Float
    }


view : Config msg -> List (Attribute msg) -> List (Html msg) -> Html msg
view config attrs children =
    node "hammer-wrapper"
        ([ on "pan" (Decode.map config.onPan panDecoder)
         , on "pinch" (Decode.map config.onZoom zoomDecoder)
         ]
            ++ attrs
        )
        children


zoomDecoder : Decode.Decoder ZoomData
zoomDecoder =
    Decode.at [ "detail", "hammerdata" ]
        (Decode.map ZoomData
            (Decode.field "scale" Decode.float)
            -- (Decode.field "deltaX" Decode.float)
            -- (Decode.field "deltaY" Decode.float)
        )


panDecoder : Decode.Decoder PanData
panDecoder =
    Decode.at [ "detail", "hammerdata" ]
        (Decode.map2 PanData
            (Decode.field "deltaX" Decode.float)
            (Decode.field "deltaY" Decode.float)
        )
