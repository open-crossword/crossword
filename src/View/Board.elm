module View.Board exposing (Config, Transform, initTransform, view)

import Css exposing (absolute, alignItems, backgroundColor, border3, center, displayFlex, fontSize, left, margin, marginLeft, marginTop, position, property, px, relative, rgb, solid, top)
import Data.Board as Board exposing (Board)
import Data.Grid as Grid exposing (Grid)
import Data.Point as Point exposing (Point)
import Data.Puzzle as Puzzle exposing (Cell(..), Clue, ClueId, Metadata, Puzzle)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick, preventDefaultOn)
import Html.Styled.Lazy exposing (..)
import List.Extra as List
import Styles
import Svg.Styled as Svg exposing (Svg)
import Svg.Styled.Attributes as SvgA
import Svg.Styled.Events as SvgE


type alias Transform =
    { initScale : Float
    , scale : Float
    , offsetX : Float
    , offsetY : Float
    }


initTransform : Transform
initTransform =
    { initScale = 1
    , offsetX = 0
    , offsetY = 0
    , scale = 1
    }


type alias Config msg =
    { onCellClicked : Point -> msg
    , clueIndicesVisible : Bool
    , selectionVisible : Bool
    , board : Board
    , puzzle : Puzzle
    }


view : Transform -> Config msg -> Html msg
view boardTransform ({ puzzle, board } as config) =
    let
        ( viewboxWidth, viewboxHeight ) =
            viewboxDimensions puzzle.grid
    in
    Svg.svg
        [ SvgA.viewBox ("-2 -2 " ++ String.fromInt (viewboxWidth + 4) ++ " " ++ String.fromInt (viewboxHeight + 4))
        , SvgA.id "game-grid"
        , SvgA.css [ Css.property "pointer-events" "all" ]
        ]
        [ Svg.g [ SvgA.transform (boardTransformToCssTransform boardTransform ( viewboxWidth, viewboxHeight )) ]
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
            , lazy5 lazyThing config.onCellClicked config.selectionVisible config.clueIndicesVisible config.board config.puzzle
            ]
        ]


lazyThing : (Point -> msg) -> Bool -> Bool -> Board -> Puzzle -> Svg msg
lazyThing onCellClicked clueIndicesVisible selectionVisible board puzzle =
    Svg.g []
        (board.grid
            |> Grid.to2DList
            -- this could probably be part of Grid.to2DList (to2DListNonEmpty?)
            |> List.map (List.filterMap identity)
            |> List.indexedMap (viewRow onCellClicked clueIndicesVisible selectionVisible board puzzle)
            |> List.concat
        )


viewRow : (Point -> msg) -> Bool -> Bool -> Board -> Puzzle -> Int -> List Cell -> List (Svg msg)
viewRow onCellClicked clueIndicesVisible selectionVisible board puzzle y row =
    List.indexedMap (viewCell onCellClicked clueIndicesVisible selectionVisible board puzzle y) row
        |> List.concat


viewCell : (Point -> msg) -> Bool -> Bool -> Board -> Puzzle -> Int -> Int -> Cell -> List (Svg msg)
viewCell onCellClicked clueIndicesVisible selectionVisible board puzzle y x cell =
    let
        point =
            Debug.log "MEE" ( x, y )

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
    List.concat
        [ case cell of
            Letter char ->
                [ Svg.rect
                    [ SvgE.onMouseDown (onCellClicked point)
                    , SvgA.width (String.fromInt w)
                    , SvgA.height (String.fromInt h)
                    , SvgA.stroke "black"
                    , SvgA.strokeWidth ".5"
                    , SvgA.x (String.fromInt (x * w))
                    , SvgA.y (String.fromInt (y * h))
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
                    , SvgA.x (String.fromInt (x * w + 5))
                    , SvgA.y (String.fromInt (y * h + 8))
                    , SvgA.textAnchor "middle"
                    , SvgA.width (String.fromInt w)
                    , SvgA.height (String.fromInt h)
                    ]
                    [ Svg.text (String.fromChar char) ]
                ]

            Shaded ->
                [ Svg.rect
                    [ SvgA.width (String.fromInt w)
                    , SvgA.height (String.fromInt h)
                    , SvgA.fill "black"
                    , SvgA.stroke "black"
                    , SvgA.x (String.fromInt (x * w))
                    , SvgA.y (String.fromInt (y * h))
                    , SvgA.strokeWidth ".5"
                    ]
                    []
                ]
        , case ( clueIndicesVisible, wordStartNumber ) of
            ( True, Just n ) ->
                [ Svg.text_
                    [ SvgA.css [ Css.fontSize (px 3), Css.property "pointer-events" "none" ]
                    , SvgA.x (String.fromInt (x * w + 1))
                    , SvgA.y (String.fromInt (y * h + 3))
                    ]
                    [ Svg.text (String.fromInt n) ]
                ]

            ( _, _ ) ->
                []
        ]


viewCellClueIndex : Int -> Html msg
viewCellClueIndex number =
    span [] [ text (String.fromInt number) ]


svgScale =
    10


viewboxDimensions : Grid a -> ( Int, Int )
viewboxDimensions grid =
    ( Grid.width grid * svgScale
    , Grid.height grid * svgScale
    )


boardTransformToCssTransform : Transform -> ( Int, Int ) -> String
boardTransformToCssTransform bg ( viewboxW, viewboxH ) =
    let
        translateX2 =
            String.fromFloat (bg.offsetX * svgScale)

        translateY2 =
            String.fromFloat (bg.offsetY * svgScale)

        sx =
            bg.scale

        sy =
            bg.scale

        cx =
            toFloat viewboxH / 2

        cy =
            toFloat viewboxH / 2

        matrix a b c d e f =
            "matrix(" ++ String.join "," (List.map String.fromFloat [ a, b, c, d, e, f ]) ++ ")"
    in
    String.join " "
        [ matrix sx 0 0 sy (cx - sx * cx) (cy - sy * cy)

        -- TODO: should be able to merge this transform into the matrix
        , "translate(" ++ translateX2 ++ ", " ++ translateY2 ++ ")"
        ]
