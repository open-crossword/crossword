module View.Board exposing (view)

import Css exposing (absolute, alignItems, backgroundColor, border3, center, displayFlex, fontSize, left, margin, marginLeft, marginTop, position, property, px, relative, rgb, solid, top)
import Data.Board as Board exposing (Board)
import Data.Grid as Grid exposing (Grid)
import Data.Point as Point exposing (Point)
import Data.Puzzle as Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick, preventDefaultOn)
import List.Extra as List
import Styles
import Svg.Styled as Svg exposing (Svg)
import Svg.Styled.Attributes as SvgA
import Svg.Styled.Events as SvgE


type alias Config msg =
    { onCellClicked : Point -> msg
    , clueIndicesVisible : Bool
    , selectionVisible : Bool
    , board : Board
    , puzzle : Puzzle
    }


view : Config msg -> Html msg
view ({ puzzle, board } as config) =
    let
        ( viewboxWidth, viewboxHeight ) =
            viewboxDimensions puzzle.grid
    in
    Svg.svg
        [ SvgA.viewBox ("-2 -2 " ++ String.fromInt (viewboxWidth + 4) ++ " " ++ String.fromInt (viewboxHeight + 4))
        , SvgA.id "game-grid"
        ]
        [ Svg.rect
            [ SvgA.width (String.fromInt (viewboxWidth + 2))
            , SvgA.height (String.fromInt (viewboxHeight + 2))
            , SvgA.x "-1"
            , SvgA.y "-1"
            , SvgA.fill "none"
            , SvgA.stroke "black"
            , SvgA.strokeWidth "2"
            ]
            []
        , Svg.g []
            (board.grid
                |> Grid.to2DList
                -- this could probably be part of Grid.to2DList (to2DListNonEmpty?)
                |> List.map (List.filterMap identity)
                |> List.indexedMap (viewRow config)
            )
        ]


viewRow : Config msg -> Int -> List Cell -> Svg msg
viewRow ({ puzzle, board } as config) y row =
    Svg.g
        [-- css [ rowStyle ]
        ]
        (List.indexedMap (viewCell config y) row)


viewCell : Config msg -> Int -> Int -> Cell -> Svg msg
viewCell ({ puzzle, board, clueIndicesVisible, selectionVisible } as config) y x cell =
    let
        point =
            ( x, y )

        isSelected =
            board.selection.cursor == point

        isWordStart =
            List.find (\ws -> ws.point == point) puzzle.wordStarts
                |> Maybe.map .direction

        wordStartNumber =
            List.find (\ws -> ws.point == point) puzzle.wordStarts
                |> Maybe.map .clueNumber

        ( viewboxWidth, viewboxHeight ) =
            viewboxDimensions puzzle.grid

        w =
            viewboxWidth // Grid.width puzzle.grid

        h =
            viewboxHeight // Grid.height puzzle.grid
    in
    Svg.g
        [ SvgA.transform ("translate(" ++ String.fromInt (x * w) ++ "," ++ String.fromInt (y * h) ++ ")")
        ]
        [ case cell of
            Letter char ->
                Svg.g
                    []
                    [ Svg.rect
                        [ SvgE.onMouseDown (config.onCellClicked point)
                        , SvgA.width (String.fromInt w)
                        , SvgA.height (String.fromInt h)
                        , SvgA.stroke "black"
                        , SvgA.strokeWidth ".5"
                        , SvgA.css
                            [ Css.property "touch-action" "manipulation"
                            , Css.property "-webkit-tap-highlight-color" "transparent"
                            ]
                        , if selectionVisible && isSelected then
                            SvgA.fill (Styles.colorToRgbString Styles.colors.selectedCursor)

                          else if selectionVisible && Board.isSelectedWord point puzzle board then
                            SvgA.fill (Styles.colorToRgbString Styles.colors.selectedWord)

                          else
                            SvgA.fill "white"
                        ]
                        []
                    , Svg.text_
                        [ SvgA.css [ Css.fontSize (px 5), Css.property "pointer-events" "none" ]
                        , SvgA.x "5"
                        , SvgA.y "8"
                        , SvgA.textAnchor "middle"
                        , SvgA.width (String.fromInt w)
                        , SvgA.height (String.fromInt h)
                        ]
                        [ Svg.text (String.fromChar char) ]
                    ]

            Shaded ->
                Svg.rect
                    [ SvgA.width (String.fromInt w)
                    , SvgA.height (String.fromInt h)
                    , SvgA.fill "black"
                    , SvgA.stroke "black"
                    , SvgA.strokeWidth ".5"
                    ]
                    []
        , case ( clueIndicesVisible, wordStartNumber ) of
            ( True, Just n ) ->
                Svg.text_
                    [ SvgA.css [ Css.fontSize (px 3), Css.property "pointer-events" "none" ]
                    , SvgA.x "1"
                    , SvgA.y "3"
                    ]
                    [ Svg.text (String.fromInt n) ]

            ( _, _ ) ->
                Svg.g [] []
        ]


viewCellClueIndex : Int -> Html msg
viewCellClueIndex number =
    span [] [ text (String.fromInt number) ]


viewboxDimensions : Grid a -> ( Int, Int )
viewboxDimensions grid =
    let
        svgScale =
            10
    in
    ( Grid.width grid * svgScale
    , Grid.height grid * svgScale
    )
