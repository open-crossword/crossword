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

        list =
            if h == 0 then
                [ String.fromInt m
                , String.padLeft 2 '0' (String.fromInt s)
                ]

            else
                [ String.fromInt h
                , String.padLeft 2 '0' (String.fromInt m)
                , String.padLeft 2 '0' (String.fromInt s)
                ]
    in
    String.join ":" list
