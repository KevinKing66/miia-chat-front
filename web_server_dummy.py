from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv, find_dotenv
from fastapi import FastAPI, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
from starlette.requests import Request



ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=env.get("APP_SECRET_KEY", "supersecret"))

templates = Jinja2Templates(directory="web")

oauth = OAuth()
oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={"scope": "openid profile email"},
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration',
)

def get_user_session(request: Request):
    return request.session.get("user")


@app.get("/callback")
async def callback(request: Request):
    token = await oauth.auth0.authorize_access_token(request)
    request.session["user"] = token
    return RedirectResponse(url="/")

@app.get("/logout")
def logout(request: Request):
    request.session.clear()
    return RedirectResponse(
        url="https://" + env.get("AUTH0_DOMAIN") + "/v2/logout?" + urlencode(
            {
                "returnTo": request.url_for("home"),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )


@app.get("/login")
async def login(request: Request):
    redirect_url = str(request.url_for("callback")).replace("http:", "https:")
    print("redirect_url")
    print(redirect_url)
    print("oauth:")
    print(json.dumps(oauth.__dict__, indent=4, default=str))
    # return json.dumps(oauth.__dict__, indent=4, default=str)
    return await oauth.auth0.authorize_redirect(request, redirect_uri=redirect_url)

@app.get("/")
def home(request: Request, user: dict = Depends(get_user_session)):
    return templates.TemplateResponse(
        "index.html", {"request": request, "session": user, "pretty": json.dumps(user, indent=4) if user else "{}"})


@app.get("/user-info")
def getUserInfo(request: Request, user: dict = Depends(get_user_session)):
    return user


# Servir archivos estáticos desde la carpeta "web"
app.mount("/", StaticFiles(directory="web", html=True), name="web")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
