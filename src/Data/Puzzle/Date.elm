module Data.Puzzle.Date exposing (parseDateString)

import Calendar
import Maybe.Extra as Maybe
import Time


intToMonth : Int -> Maybe Time.Month
intToMonth int =
    case int of
        1 ->
            Just Time.Jan

        2 ->
            Just Time.Feb

        3 ->
            Just Time.Mar

        4 ->
            Just Time.Apr

        5 ->
            Just Time.May

        6 ->
            Just Time.Jun

        7 ->
            Just Time.Jul

        8 ->
            Just Time.Aug

        9 ->
            Just Time.Sep

        10 ->
            Just Time.Oct

        11 ->
            Just Time.Nov

        12 ->
            Just Time.Dec

        _ ->
            Nothing


toEnglishWeekday : Time.Weekday -> String
toEnglishWeekday weekday =
    case weekday of
        Time.Mon ->
            "Monday"

        Time.Tue ->
            "Tuesday"

        Time.Wed ->
            "Wednesday"

        Time.Thu ->
            "Thursday"

        Time.Fri ->
            "Friday"

        Time.Sat ->
            "Saturday"

        Time.Sun ->
            "Sunday"


toEnglishMonth : Time.Month -> String
toEnglishMonth month =
    case month of
        Time.Jan ->
            "January"

        Time.Feb ->
            "Feburary"

        Time.Mar ->
            "March"

        Time.Apr ->
            "April"

        Time.May ->
            "May"

        Time.Jun ->
            "June"

        Time.Jul ->
            "July"

        Time.Aug ->
            "August"

        Time.Sep ->
            "September"

        Time.Oct ->
            "October"

        Time.Nov ->
            "November"

        Time.Dec ->
            "December"


dateFromYearMonthDay : Int -> Int -> Int -> Maybe Calendar.Date
dateFromYearMonthDay yearInt monthInt dayInt =
    intToMonth monthInt
        |> Maybe.andThen
            (\month ->
                Calendar.fromRawParts (Calendar.RawDate yearInt month dayInt)
            )


parseDateString : String -> Maybe { weekDay : String, englishMonth : String, dayNum : String, year : String }
parseDateString dateString =
    let
        listToTriple : List a -> Maybe ( a, a, a )
        listToTriple ls =
            case ls of
                [ yearInt, monthInt, dayInt ] ->
                    Just ( yearInt, monthInt, dayInt )

                _ ->
                    Nothing

        tupleAp3 : (a -> b -> c -> d) -> ( a, b, c ) -> d
        tupleAp3 fn ( a, b, c ) =
            fn a b c
    in
    String.split "-" dateString
        |> Maybe.traverse String.toInt
        |> Maybe.andThen listToTriple
        |> Maybe.andThen (tupleAp3 dateFromYearMonthDay)
        |> Maybe.map
            (\date ->
                { weekDay = toEnglishWeekday (Calendar.getWeekday date)
                , englishMonth = toEnglishMonth (Calendar.getMonth date)
                , dayNum = String.fromInt (Calendar.getDay date)
                , year = String.fromInt (Calendar.getYear date)
                }
            )
