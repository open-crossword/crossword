module Main exposing (main)

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


type PageModel
    = Redirect
    | NotFound
    | Home Home.Model
    | Game Game.Model
    | About About.Model


type alias Model =
    { session : Session
    , pageModel : PageModel
    }


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url navKey =
    changeRouteTo (Route.fromUrl url)
        { session = Session.init navKey
        , pageModel = Redirect
        }


toSession : Model -> Session
toSession { session } =
    session


changeRouteTo : Maybe Route -> Model -> ( Model, Cmd Msg )
changeRouteTo maybeRoute model =
    let
        session =
            toSession model

        doInit : (subModel -> PageModel) -> ( subModel, Cmd subMsg ) -> (subMsg -> Msg) -> ( PageModel, Cmd Msg )
        doInit toModel ( subModel, subCmd ) toMsg =
            ( toModel subModel, Cmd.map toMsg subCmd )

        ( pageModel, cmd ) =
            case maybeRoute of
                Nothing ->
                    ( NotFound, Cmd.none )

                Just Route.Home ->
                    doInit Home (Home.init session) GotHomeMsg

                Just (Route.Game gameId) ->
                    doInit Game (Game.init session) GotGameMsg

                Just Route.About ->
                    doInit About (About.init session) GotAboutMsg
    in
    ( { model | pageModel = pageModel }, cmd )


updateWith :
    Model
    -> (subModel -> PageModel)
    -> (subMsg -> Msg)
    -> ( subModel, Cmd subMsg )
    -> ( Model, Cmd Msg )
updateWith originalModel toModel toMsg ( subModel, subCmd ) =
    ( { originalModel | pageModel = toModel subModel }
    , Cmd.map toMsg subCmd
    )



-- VIEW --


view : Model -> Document Msg
view model =
    let
        viewPage : Page -> (msg -> Msg) -> { title : String, content : Html msg } -> Document Msg
        viewPage page toMsg content =
            let
                mappedContent =
                    content.content |> Html.Styled.map toMsg

                { title, body } =
                    Page.view
                        { session = toSession model
                        , page = page
                        , content = { content = mappedContent, title = content.title }
                        , onMenuToggle = NavBarToggled
                        }
            in
            { title = title
            , body = body
            }
    in
    case model.pageModel of
        Redirect ->
            viewPage Page.Other (\_ -> NoOp) Blank.view

        NotFound ->
            viewPage Page.Other (\_ -> NoOp) NotFound.view

        Home subModel ->
            viewPage Page.Home GotHomeMsg (Home.view subModel)

        Game subModel ->
            viewPage Page.Game GotGameMsg (Game.view subModel)

        About subModel ->
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
    case ( msg, model.pageModel ) of
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

        ( GotHomeMsg subMsg, Home subModel ) ->
            Home.update subMsg subModel
                |> updateWith model Home GotHomeMsg

        ( GotGameMsg subMsg, Game subModel ) ->
            Game.update subMsg subModel
                |> updateWith model Game GotGameMsg

        ( GotAboutMsg subMsg, About subModel ) ->
            About.update subMsg subModel
                |> updateWith model About GotAboutMsg

        ( NavBarToggled, _ ) ->
            ( { model | session = Session.toggleMenuCollapsed model.session }
            , Cmd.none
            )

        ( _, _ ) ->
            ( model, Cmd.none )



-- SUBS __


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.pageModel of
        Game subModel ->
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
