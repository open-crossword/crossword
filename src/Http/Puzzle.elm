module Http.Puzzle exposing (Error, get, random)

import Data.Env exposing (Env)
import Data.Puzzle as Puzzle exposing (Puzzle)
import Data.Puzzle.Id as PuzzleId exposing (PuzzleId)
import Http
import Http.Api as Api
import Json.Decode as JD exposing (Decoder)
import Parser exposing (Parser)
import Puzzle.Format.Xd
import Result.Extra as Result
import Url.Builder as Url


type Error
    = HttpError Http.Error
    | ParseError (List Parser.DeadEnd)


get : Env -> (Result Error Puzzle -> msg) -> PuzzleId -> Cmd msg
get env toMsg puzzleId =
    let
        parse : String -> Result (List Parser.DeadEnd) Puzzle
        parse puzzleStr =
            Puzzle.Format.Xd.parse puzzleId puzzleStr
    in
    Http.get
        { url = Api.makeUrl env [ "puzzles", PuzzleId.toString puzzleId ] []
        , expect =
            Http.expectString
                (Result.mapError HttpError
                    >> Result.andThen
                        (parse >> Result.mapError ParseError)
                    >> toMsg
                )
        }


random : Env -> (Result Error (List Puzzle) -> msg) -> Int -> Cmd msg
random env toMsg howMany =
    Http.get
        { url = Api.makeUrl env [ "puzzles" ] [ Url.int "n" howMany ]
        , expect = Http.expectJson (errorify toMsg) (JD.list puzzleDecoder)
        }


errorify : (Result Error x -> msg) -> (Result Http.Error x -> msg)
errorify resultFromX =
    \httpResult ->
        resultFromX (Result.mapError HttpError httpResult)


puzzleDecoder : Decoder Puzzle
puzzleDecoder =
    let
        decodeId =
            JD.field "id" JD.string

        decodePuzzle id =
            PuzzleId.fromString id
                |> Puzzle.Format.Xd.puzzle
                |> parserToDecoder
                |> JD.field "puzzle"
    in
    decodeId
        |> JD.andThen decodePuzzle


parserToDecoder : Parser a -> Decoder a
parserToDecoder parser =
    -- this is a nice general function, ruined by that \n bullshit
    JD.string
        |> JD.map (\x -> Parser.run parser (x ++ "\n"))
        |> JD.map (Result.mapError (always "Failed to parse puzzle!"))
        |> JD.andThen (Result.unpack JD.fail JD.succeed)
