module Page.Home exposing (Model, Msg, init, update, view)

import Css exposing (pct, px)
import Css.Transitions
import Data.Board as Board exposing (Board)
import Data.Loadable as Loadable exposing (Loadable)
import Data.Puzzle as Puzzle exposing (Puzzle)
import Data.Puzzle.Date as PuzzleDate
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
import Svg.Styled as Svg
import Svg.Styled.Attributes as SvgA
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
        , case model.samplePuzzles of
            Loadable.Loading ->
                viewCards (List.repeat 8 Nothing)

            Loadable.Loaded puzzles ->
                viewCards (List.map Just puzzles)

            Loadable.Failed err ->
                pre [] [ text (Debug.toString err) ]
        ]


viewCards : List (Maybe Puzzle) -> Html Msg
viewCards puzzles =
    div
        [ css
            [ Css.displayFlex
            , Css.flexWrap Css.wrap
            , Styles.justifyContentCenter
            ]
        ]
        (List.map viewCard puzzles)


viewCard : Maybe Puzzle -> Html Msg
viewCard maybePuzzle =
    case maybePuzzle of
        Just puzzle ->
            viewPuzzle puzzle

        Nothing ->
            viewPuzzleLoading


cardStyle =
    Css.batch
        [ Css.width (pct 20)
        , Css.minWidth (px 200)
        , Css.maxWidth (px 400)
        , Css.margin (pct 1)
        , Css.borderRadius (px 0)
        , Css.boxShadow4 (px 0) (px 6) (px 8) (Css.rgba 0 0 0 0.1)
        , Css.textDecoration Css.none
        , Css.color Styles.colors.black
        , Css.cursor Css.pointer
        , Css.backgroundColor Styles.colors.white
        , Css.Transitions.transition
            [ Css.Transitions.transform3 50 0 Css.Transitions.easeOut
            , Css.Transitions.boxShadow3 50 0 Css.Transitions.easeOut
            ]
        , Css.property "transition" "transform 0.05s ease-out, box-shadow 0.05s ease-out"
        , Css.backgroundColor Styles.colors.white
        , Css.hover
            [ Css.boxShadow4 (px 0) (px 6) (px 8) (Css.rgba 0 0 0 0.2)
            , Css.transform (Css.scale 1.01)
            ]
        ]


cardTitleStyle =
    Css.batch
        [ Css.textAlign Css.center
        , Css.margin (pct 3)
        ]


viewPuzzle : Puzzle -> Html Msg
viewPuzzle puzzle =
    a
        [ css [ cardStyle ]
        , Route.gameForId puzzle.id
        ]
        [ div
            []
            [ Board.view
                { onCellClicked = always NoOp
                , clueIndicesVisible = False
                , selectionVisible = False
                , board = Board.fromPuzzle puzzle
                , puzzle = puzzle
                }
            ]
        , div [ css [ cardTitleStyle ] ]
            [ case
                puzzle.metadata.date
                    |> Maybe.andThen
                        PuzzleDate.parseDateString
              of
                Just { weekDay, englishMonth, dayNum, year } ->
                    text (weekDay ++ " " ++ englishMonth ++ " " ++ dayNum ++ ", " ++ year)

                Nothing ->
                    text "Puzzle"
            ]
        ]


viewPuzzleLoading : Html Msg
viewPuzzleLoading =
    div
        [ css
            [ cardStyle ]
        ]
        [ div
            [ css
                [ Styles.shimmerAnimation
                ]
            ]
            -- Use an empty SVG to keep aspect ratio but fill all available space
            [ Svg.svg [ SvgA.viewBox "0 0 1 1" ] [] ]
        , div
            [ css
                [ Styles.shimmerAnimation
                , cardTitleStyle
                , Css.height (px 16)
                ]
            ]
            [ text "" ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        GotRandomPuzzles result ->
            ( { model | samplePuzzles = Loadable.fromHttpResult result }, Cmd.none )
