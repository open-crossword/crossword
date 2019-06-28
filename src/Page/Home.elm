module Page.Home exposing (Model, Msg, init, update, view)

import Css exposing (px)
import Data.Board as Board exposing (Board)
import Data.Puzzle as Puzzle exposing (Puzzle)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Http
import Json.Decode as JD exposing (Decoder)
import Parser exposing (Parser)
import Puzzle.Format.Xd
import Result.Extra as Result
import Session exposing (Session)
import Styles
import View.Board as Board
import View.Logo as Logo


type Msg
    = GotRandomPuzzles (Result Http.Error (List Puzzle))
    | NoOp


type alias Model =
    { samplePuzzles : Loadable (List Puzzle)
    }


type Loadable a
    = Loading
    | Loaded a
    | Failed Http.Error


httpResultToLoadable : Result Http.Error a -> Loadable a
httpResultToLoadable result =
    case result of
        Ok data ->
            Loaded data

        Err err ->
            Failed err


getRandomPuzzles : Cmd Msg
getRandomPuzzles =
    Http.get
        { url = "http://localhost:8080/puzzles/"
        , expect = Http.expectJson GotRandomPuzzles (JD.list puzzleDecoder)
        }


puzzleDecoder : Decoder Puzzle
puzzleDecoder =
    parserToDecoder Puzzle.Format.Xd.puzzle


parserToDecoder : Parser a -> Decoder a
parserToDecoder parser =
    JD.string
        |> JD.map (\x -> Parser.run parser (x ++ "\n"))
        |> JD.map (Result.mapError Debug.toString)
        |> JD.andThen (Result.unpack JD.fail JD.succeed)


init : Session -> ( Model, Cmd Msg )
init session =
    ( { samplePuzzles = Loading }, getRandomPuzzles )


view : Model -> { title : String, content : Html Msg }
view model =
    { title = "Home"
    , content = content model
    }


content : Model -> Html Msg
content model =
    div
        [ css
            [ Css.displayFlex
            , Css.flexDirection Css.column
            , Css.alignItems Css.center
            , Styles.fonts.avenir
            ]
        ]
        [ h3 [] [ text "Welcome to Crossword Games!" ]
        , div
            [ css [ Css.maxWidth (px 300) ]
            ]
            [ Logo.view ]
        , case model.samplePuzzles of
            Loading ->
                div [] [ text "loading..." ]

            Loaded puzzles ->
                div
                    [ css
                        [ Css.displayFlex
                        , Css.flexWrap Css.wrap
                        , Styles.justifyContentCenter
                        ]
                    ]
                    (List.map viewPuzzle puzzles)

            Failed err ->
                pre [] [ text (Debug.toString err) ]
        ]


viewPuzzle : Puzzle -> Html Msg
viewPuzzle puzzle =
    div
        [ css
            [ Css.width (Css.pct 20)
            , Css.margin (px 20)
            , Css.padding (px 20)
            , Css.border3 (px 2) Css.solid Styles.colors.black
            , Css.borderRadius (px 8)
            , Css.boxShadow5 (px 0) (px 3) (px 5) (px 1) (Css.rgba 0 0 0 0.1)
            ]
        ]
        [ div []
            [ Board.view
                { onCellClicked = always NoOp
                , clueIndicesVisible = False
                , selectionVisible = False
                , board = Board.fromPuzzle puzzle
                , puzzle = puzzle
                }
            ]
        , div [ css [ Css.textAlign Css.center, Css.marginTop (px 4) ] ]
            [ case puzzle.metadata.date of
                Just date ->
                    text date

                Nothing ->
                    text ""
            ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        GotRandomPuzzles result ->
            ( { model | samplePuzzles = httpResultToLoadable result }, Cmd.none )
