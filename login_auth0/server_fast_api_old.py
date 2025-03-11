from os import environ as env
from dotenv import find_dotenv, load_dotenv

from auth0.v3.authentication import GetToken

domain = f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
client_id = env.get("AUTH0_CLIENT_ID")
client_secret = env.get("AUTH0_CLIENT_SECRET")
audience = "https://tu-api.com/"

get_token = GetToken(domain)
token = get_token.client_credentials(client_id, client_secret, audience)

access_token = token['access_token']
print(access_token)