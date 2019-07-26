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
    , velocityX : Float
    , velocityY : Float
    , isStart : Bool
    }


type alias PanData =
    { deltaX : Float
    , deltaY : Float
    , velocityX : Float
    , velocityY : Float
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
        (Decode.map4 ZoomData
            (Decode.field "scale" Decode.float)
            (Decode.field "velocityX" Decode.float)
            (Decode.field "velocityY" Decode.float)
            (Decode.field "type" Decode.string
                |> Decode.map (\str -> str == "pinchstart")
            )
        )


panDecoder : Decode.Decoder PanData
panDecoder =
    Decode.at [ "detail", "hammerdata" ]
        (Decode.map4 PanData
            (Decode.field "deltaX" Decode.float)
            (Decode.field "deltaY" Decode.float)
            (Decode.field "velocityX" Decode.float)
            (Decode.field "velocityY" Decode.float)
        )
