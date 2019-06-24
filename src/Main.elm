module Main exposing (Msg(..), main)

import Browser exposing (Document)
import Browser.Navigation as Nav
import Html as UnstyledHtml
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (onClick)
import Json.Decode as Decode exposing (Value)
import Page exposing (Page)
import Page.About as About
import Page.Blank as Blank
import Page.Game as Game
import Page.Home as Home
import Page.NotFound as NotFound
import Route exposing (Route)
import Session exposing (Session)
import Url exposing (Url)



-- MODEL --


type Model
    = Redirect Session
    | NotFound Session
    | Home Session Home.Model
    | Game Session Game.Model
    | About Session About.Model


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url navKey =
    changeRouteTo (Route.fromUrl url)
        (Redirect (Session.init navKey))


toSession : Model -> Session
toSession model =
    case model of
        Redirect session ->
            session

        NotFound session ->
            session

        Home session _ ->
            session

        Game session _ ->
            session

        About session _ ->
            session


changeRouteTo : Maybe Route -> Model -> ( Model, Cmd Msg )
changeRouteTo maybeRoute model =
    let
        session =
            toSession model
    in
    case maybeRoute of
        Nothing ->
            ( NotFound session, Cmd.none )

        Just Route.Home ->
            Home.init session
                |> updateWith (Home session) GotHomeMsg model

        Just (Route.Game gameId) ->
            Game.init session
                |> updateWith (Game session) GotGameMsg model

        Just Route.About ->
            About.init session
                |> updateWith (About session) GotAboutMsg model


updateWith :
    (subModel -> Model)
    -> (subMsg -> Msg)
    -> Model
    -> ( subModel, Cmd subMsg )
    -> ( Model, Cmd Msg )
updateWith toModel toMsg model ( subModel, subCmd ) =
    ( toModel subModel
    , Cmd.map toMsg subCmd
    )



-- VIEW --


view : Model -> Document Msg
view model =
    let
        viewPage page toMsg content =
            let
                { title, body } =
                    Page.view (toSession model) page content
            in
            { title = title
            , body = List.map (UnstyledHtml.map toMsg) body
            }
    in
    case model of
        Redirect _ ->
            viewPage Page.Other (\_ -> NoOp) Blank.view

        NotFound _ ->
            viewPage Page.Other (\_ -> NoOp) NotFound.view

        Home session subModel ->
            viewPage Page.Home GotHomeMsg (Home.view subModel)

        Game session subModel ->
            viewPage Page.Game GotGameMsg (Game.view subModel)

        About session subModel ->
            viewPage Page.About GotAboutMsg (About.view subModel)



-- UPDATE --


type Msg
    = NoOp
    | ChangedRoute (Maybe Route)
    | ChangedUrl Url
    | NavBarToggled
    | ClickedLink Browser.UrlRequest
    | GotHomeMsg Home.Msg
    | GotGameMsg Game.Msg
    | GotAboutMsg About.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( ClickedLink urlRequest, _ ) ->
            case urlRequest of
                Browser.Internal url ->
                    ( model
                    , Nav.pushUrl
                        (Session.navKey (toSession model))
                        (Url.toString url)
                    )

                Browser.External href ->
                    ( model
                    , Nav.load href
                    )

        ( ChangedUrl url, _ ) ->
            changeRouteTo (Route.fromUrl url) model

        ( GotHomeMsg subMsg, Home session subModel ) ->
            Home.update subMsg subModel
                |> updateWith (Home session) GotHomeMsg model

        ( GotGameMsg subMsg, Game session subModel ) ->
            Game.update subMsg subModel
                |> updateWith (Game session) GotGameMsg model

        ( GotAboutMsg subMsg, About session subModel ) ->
            About.update subMsg subModel
                |> updateWith (About session) GotAboutMsg model

        ( _, _ ) ->
            ( model, Cmd.none )



-- SUBS __


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        Game _ subModel ->
            Game.subscriptions subModel
                |> Sub.map GotGameMsg

        _ ->
            Sub.none



-- MAIN --


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , onUrlChange = ChangedUrl
        , onUrlRequest = ClickedLink
        , subscriptions = subscriptions
        , update = update
        , view = view
        }
