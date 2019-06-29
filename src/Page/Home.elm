module Page.Home exposing (Model, Msg, init, update, view)

import Css exposing (px)
import Data.Board as Board exposing (Board)
import Data.Loadable as Loadable exposing (Loadable)
import Data.Puzzle as Puzzle exposing (Puzzle)
import Data.Puzzle.Id as PuzzleId
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Http
import Http.Puzzle
import Parser exposing (Parser)
import Puzzle.Format.Xd
import Result.Extra as Result
import Route
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


init : Session -> ( Model, Cmd Msg )
init session =
    ( { samplePuzzles = Loadable.Loading }
    , Http.Puzzle.random GotRandomPuzzles 8
    )


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
            Loadable.Loading ->
                div [] [ text "loading..." ]

            Loadable.Loaded puzzles ->
                div
                    [ css
                        [ Css.displayFlex
                        , Css.flexWrap Css.wrap
                        , Styles.justifyContentCenter
                        ]
                    ]
                    (List.map viewPuzzle puzzles)

            Loadable.Failed err ->
                pre [] [ text (Debug.toString err) ]
        ]


viewPuzzle : Puzzle -> Html Msg
viewPuzzle puzzle =
    a
        [ css
            [ Css.width (Css.pct 20)
            , Css.margin (px 20)
            , Css.padding (px 20)
            , Css.border3 (px 2) Css.solid Styles.colors.black
            , Css.borderRadius (px 8)
            , Css.boxShadow5 (px 0) (px 3) (px 5) (px 1) (Css.rgba 0 0 0 0.1)
            ]
        , Route.gameForId puzzle.id
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
        , div [] [ text (PuzzleId.toString puzzle.id) ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        GotRandomPuzzles result ->
            ( { model | samplePuzzles = Loadable.fromHttpResult result }, Cmd.none )
