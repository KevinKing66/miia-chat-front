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

templates = Jinja2Templates(directory="templates")

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

@app.get("/")
def home(request: Request, user: dict = Depends(get_user_session)):
    return templates.TemplateResponse(
        "home.html", {"request": request, "session": user, "pretty": json.dumps(user, indent=4) if user else "{}"}
    )

@app.get("/callback")
async def callback(request: Request):
    token = await oauth.auth0.authorize_access_token(request)
    request.session["user"] = token
    return RedirectResponse(url="/")

@app.get("/login")
async def login(request: Request):
    redirect_url = str(request.url_for("callback")).replace("http:", "https:")
    print("redirect_url")
    print(redirect_url)
    print("oauth:")
    print(json.dumps(oauth.__dict__, indent=4, default=str))
    # return json.dumps(oauth.__dict__, indent=4, default=str)
    return await oauth.auth0.authorize_redirect(request, redirect_uri=redirect_url)
"""
{
    "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYta2V2aW4tdjIwMDIudXMuYXV0aDAuY29tLyJ9..a-YQ1ndg0FhhQzM4.g0EToRvnsbVRhC4xBWsDWwQO6MsEKYuRs3iIk8GGtiknWaBTIDna0JadtFq6lNV6HeoikGHtSwc57Y3XafEoLfyUnlkqgQS-Ty5WLJTxK9fQ7AwCu6sJGy3eXjQDq_nnWykyJ7hpU-TM9O5JMzm8EC5PLrJPAqNNiuPuWYmUwpgLZQ60rQ1qD3X0Yjw0LfSwBwI2KtTAcgtI0ufrs-5VYzRKimnqSsssgntFU7K-qSwiu8f82X2BcLiYcWNmIWWHUBgqHG4oFwLQvHQf_T79aNvM9E04vpkHiPZQwLlIJqNlHIFzdjbNtl9-_so8FB-GwOj80VbkUR0.GQ0vPQxioTTCXV-P0K467g",
    "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFTeUVfVGppY2JwQUFDV3ljMGNaTCJ9.eyJuaWNrbmFtZSI6ImtldmluIiwibmFtZSI6ImtldmluQGNvbXRvci5uZXQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNGY0NmRiMDM4Y2M3MzUzMWI2YjNiZDc3ZmQyNTIzY2Q_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZrZS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0wM1QxNzoxNjoyNC4zMDJaIiwiZW1haWwiOiJrZXZpbkBjb210b3IubmV0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1rZXZpbi12MjAwMi51cy5hdXRoMC5jb20vIiwiYXVkIjoicU9TdlRHeDdIYkRMaUVPeFJJNmExQm5UaWRwbEVXR0QiLCJzdWIiOiJhdXRoMHw2N2MwZDU0Yzc3MTYxYWE2ZjcxZTQ1NjEiLCJpYXQiOjE3NDEwMjIxODcsImV4cCI6MTc0MTA1ODE4Nywic2lkIjoiemROQ3lwd0NiLVpyM2I0MXpac2s2SlBqSXlVMDZYSU4iLCJub25jZSI6IkpJYnVCT3V2TGlhSHVVT2o4aE9FIn0.Nkz4tA08UxDZ6k_g-OL7du0FWe0-IUHuDjOou6BlLRYggg2vsd35sYkPuS09mhBQrMyToPsD6yS-QYdvbePLsDtePZoDE94XvGpaYEmTcMr4lEZZTlkGE7A7r355JiHA31iG82VfPu-ttH44x8ifo6KR-71K6ScA-8zJ32sX06wP5GJETF5WWAutQGxSckd8Pp60_XeTgQam4OCPf8s6JdfJtQmLuxZ4nLVQwC7imDu7-i2EHzSmooTv4gEeT8YUWRU51696L-bEFc94g_5tEc6FvjwK-Altcv_f11JqHblOG3UDSNIMB_62z2u1VAMe4ggRvMemrwMwIb3cLFgxZQ",
    "scope": "openid profile email",
    "expires_in": 86400,
    "token_type": "Bearer",
    "expires_at": 1741108588,
    "userinfo": {
        "nickname": "kevin",
        "name": "kevin@comtor.net",
        "picture": "https://s.gravatar.com/avatar/4f46db038cc73531b6b3bd77fd2523cd?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fke.png",
        "updated_at": "2025-03-03T17:16:24.302Z",
        "email": "kevin@comtor.net",
        "email_verified": false,
        "iss": "https://dev-kevin-v2002.us.auth0.com/",
        "aud": "qOSvTGx7HbDLiEOxRI6a1BnTidplEWGD",
        "sub": "auth0|67c0d54c77161aa6f71e4561",
        "iat": 1741022187,
        "exp": 1741058187,
        "sid": "zdNCypwCb-Zr3b41zZsk6JPjIyU06XIN",
        "nonce": "JIbuBOuvLiaHuUOj8hOE"
    }
}
"""

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
