module Main exposing (main)

import Browser
import Css exposing (alignItems, backgroundColor, border3, center, displayFlex, fontSize, margin, marginLeft, marginTop, property, px, rgb, solid)
import Data
import File exposing (File)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (preventDefaultOn)
import Json.Decode as Decode
import Parser
import Puzzle exposing (Cell(..), Clue, Grid, Index(..), Metadata, Puzzle)
import Task


type alias Model =
    { puzzle : Result (List Parser.DeadEnd) Puzzle }


type Msg
    = OnDropFile File (List File)
    | OnFileRead String
    | NoOp


init : ( Model, Cmd Msg )
init =
    ( { puzzle = Puzzle.parse Data.sampleData
      }
    , Cmd.none
    )


main : Program () Model Msg
main =
    Browser.element
        { init = always init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = always Sub.none
        }



--- VIEW ---


view : Model -> Html Msg
view model =
    div
        [ hijackOn "drop" dropDecoder
        , hijackOn "dragover" (Decode.succeed NoOp)
        ]
        [ case model.puzzle of
            Ok puzzle ->
                viewPuzzle puzzle

            Err err ->
                pre [] [ text (Debug.toString err) ]
        ]


viewPuzzle : Puzzle -> Html Msg
viewPuzzle puzzle =
    div []
        [ viewMetadata puzzle.metadata
        , hr [] []
        , div [ css [ displayFlex ] ]
            [ div [ css [ marginTop (px 71) ] ] [ viewGrid puzzle.grid ]
            , div [ css [ marginLeft (px 40) ] ] [ viewClues puzzle.clues ]
            ]
        ]


viewMetadata : Metadata -> Html Msg
viewMetadata metadata =
    div []
        [ div [] [ text ("Title: " ++ Maybe.withDefault "" metadata.title) ]
        , div [] [ text ("Author: " ++ Maybe.withDefault "" metadata.author) ]
        , div [] [ text ("Editor: " ++ Maybe.withDefault "" metadata.editor) ]
        , div [] [ text ("Date: " ++ Maybe.withDefault "" metadata.date) ]
        ]


viewGrid : Grid -> Html Msg
viewGrid grid =
    div
        []
        (List.map viewRow grid)


viewRow : List Cell -> Html Msg
viewRow row =
    pre
        [ css [ rowStyle ]
        ]
        (List.map viewCell row)


viewCell : Cell -> Html Msg
viewCell cell =
    case cell of
        Letter x ->
            div [ css [ cellStyle ] ] [ text (String.fromChar ' ') ]

        Shaded ->
            b [ css [ cellStyle, shadedCellStyle ] ] [ text "" ]


viewClues : List Clue -> Html Msg
viewClues clues =
    let
        isAcross clue =
            case clue.index of
                Across _ ->
                    True

                _ ->
                    False

        ( acrossClues, downClues ) =
            List.partition isAcross clues

    in
    div [ css [ displayFlex ] ]
        [ div []
            [ h2 [] [ text "Across" ]
            , div [] (List.map viewClue acrossClues)
            ]
        , div [ css [ marginLeft (px 20) ] ]
            [ h2 [] [ text "Down" ]
            , div [] (List.map viewClue downClues)
            ]
        ]


viewClue : Clue -> Html Msg
viewClue clue =
    div [] [ viewIndex clue.index, span [] [ text (" " ++ clue.clue) ] ]


viewIndex : Index -> Html Msg
viewIndex index =
    b []
        [ text
            (case index of
                Across i ->
                    String.fromInt i

                Down i ->
                    String.fromInt i
            )
        ]



--- UPDATE ---


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnDropFile file _ ->
            ( model, File.toString file |> Task.perform OnFileRead )

        OnFileRead content ->
            ( { model | puzzle = Puzzle.parse content }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )



--- STYLES ---


justifyContentCenter =
    Css.property "justify-content" "center"


black =
    rgb 0 0 0


rowStyle =
    Css.batch [ displayFlex, margin (px 0) ]


cellStyle =
    Css.batch
        [ displayFlex
        , justifyContentCenter
        , border3 (px 1) solid black
        , Css.height (px 20)
        , Css.width (px 20)
        , alignItems center
        , fontSize (px 20)
        ]


shadedCellStyle =
    backgroundColor black



--- UTILS ---


dropDecoder : Decode.Decoder Msg
dropDecoder =
    Decode.at [ "dataTransfer", "files" ] (Decode.oneOrMore OnDropFile File.decoder)


hijackOn : String -> Decode.Decoder msg -> Attribute msg
hijackOn event decoder =
    preventDefaultOn event (Decode.map hijack decoder)


hijack : msg -> ( msg, Bool )
hijack msg =
    ( msg, True )
