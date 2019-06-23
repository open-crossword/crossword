module Data.TimeFormat exposing (formatSeconds)


secondsPerHour =
    3600


secondsPerMinute =
    60


formatSeconds : Int -> String
formatSeconds seconds =
    let
        h =
            seconds // secondsPerHour

        m =
            modBy secondsPerHour seconds // secondsPerMinute

        s =
            modBy secondsPerHour (modBy secondsPerMinute seconds)
    in
    String.join ":" [ String.fromInt h, String.fromInt m, String.fromInt s ]
