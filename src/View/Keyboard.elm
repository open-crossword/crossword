module View.Keyboard exposing (Config, Msg, State, init, update, view)

import Css
import Data.Puzzle as Puzzle exposing (Clue)
import FeatherIcons as Icons
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (on, onClick, preventDefaultOn)
import Json.Decode as Decode exposing (Decoder)
import Set exposing (Set)
import Styles
import Task


type Msg msg
    = OnTouchStart Char
    | OnTouchEnd Char msg


type alias State =
    { touchedKeys : Set Char
    }


type alias Config msg =
    { onArrowLeft : msg
    , onArrowRight : msg
    , onKeyPress : Char -> msg
    , clue : Maybe Clue
    , onDeleteKeyPressed : msg
    , onCluePress : msg
    , toMsg : Msg msg -> msg
    }


init : State
init =
    State Set.empty


onTouchEnd msg =
    on "touchend" (Decode.succeed msg)


onTouchStart msg =
    on "touchstart" (Decode.succeed msg)


update : State -> Msg msg -> ( State, Cmd msg )
update state msg =
    case msg of
        OnTouchStart char ->
            ( State (Set.insert char state.touchedKeys), Cmd.none )

        OnTouchEnd char m ->
            ( State (Set.remove char state.touchedKeys)
            , Task.succeed ()
                |> Task.perform (always m)
            )


view : State -> Config msg -> Html msg
view state config =
    let
        chevronLeft =
            Icons.chevronLeft
                |> Icons.toHtml []
                |> Html.Styled.fromUnstyled

        chevronRight =
            Icons.chevronRight
                |> Icons.toHtml []
                |> Html.Styled.fromUnstyled

        arrow isLeft msg =
            div
                [ css [ Styles.keyboard.arrow ], onClick msg ]
                [ if isLeft then
                    chevronLeft

                  else
                    chevronRight
                ]

        viewClueBar maybeClue =
            div [ css [ Styles.keyboard.clues ] ]
                [ arrow True config.onArrowLeft
                , case maybeClue of
                    Just { id, clue } ->
                        div
                            [ css [ Styles.widths.p100 ]
                            , onClick config.onCluePress
                            ]
                            [ b [] [ text (Puzzle.clueIdToDisplayString id) ]
                            , text (" " ++ clue)
                            ]

                    Nothing ->
                        div [] []
                , arrow False config.onArrowRight
                ]

        viewCharKey char =
            span
                [ css [ Styles.keyboard.key ]
                , onTouchEnd (config.toMsg (OnTouchEnd char (config.onKeyPress char)))
                , onTouchStart (config.toMsg (OnTouchStart char))
                , if Set.member char state.touchedKeys then
                    css
                        [ Css.backgroundColor Styles.colors.black
                        , Css.color Styles.colors.white
                        ]

                  else
                    css []
                ]
                [ text (String.fromChar char) ]

        viewDeleteKey =
            div
                [ css [ Styles.keyboard.key ]
                , onTouchEnd config.onDeleteKeyPressed
                ]
                [ Icons.delete
                    |> Icons.withSize 50
                    |> Icons.withSizeUnit "%"
                    |> Icons.toHtml []
                    |> Html.Styled.fromUnstyled
                ]

        viewKeys =
            let
                firstRow =
                    "QWERTYUIOP"

                secondRow =
                    "ASDFGHJKL"

                thirdRow =
                    "ZXCVBNM"

                stringToKeys str =
                    List.map viewCharKey (String.toList str)

                viewKeyRow row =
                    div [ css ([ Styles.keyboard.row ]) ]
                        row
            in
            div [ css [ Styles.keyboard.keys ] ]
                [ viewKeyRow
                    (stringToKeys firstRow)
                , viewKeyRow
                    (stringToKeys secondRow)
                , viewKeyRow
                    (stringToKeys thirdRow ++ [ viewDeleteKey ])
                ]
    in
    div [ css [ Styles.keyboard.container ] ]
        [ viewClueBar config.clue
        , viewKeys
        ]
