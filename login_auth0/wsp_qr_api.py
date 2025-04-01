from fastapi import FastAPI
import httpx

app = FastAPI()

@app.get("/generate-qr")
async def call_qr():
    async with httpx.AsyncClient() as client:
        response = await client.get("http://localhost:8080/qr")
        return response.json()