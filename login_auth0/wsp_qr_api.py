from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse, JSONResponse
import httpx
import qrcode
from io import BytesIO

app = FastAPI()

@app.get("/bot/qr/image/{uuid}")
async def show_qr(uuid:str):
    qr = None
    status = None
    msg = None
    async with httpx.AsyncClient() as client:
        response = await client.get(f"http://localhost:8080/whatsapp_session/{uuid}")
        data = response.json()
        qr = data.get("qr")
        status = data.get("status")
        if(response.status_code != 200):
            msg = data.get("message")
    
    if status == "BOT_CONNECTED":
        return JSONResponse(content={"message": "El bot ya está conectado"}, status_code=403)
    
    if status == "NON-EXISTENT_QR":
        return JSONResponse(content={"message": "El QR aún no está disponible"}, status_code=404)

    if qr is None:
        return JSONResponse(content={"message": msg}, status_code=500)

    img = qrcode.make(qr)

    # Guardar la imagen en un buffer en memoria
    buf = BytesIO()
    img.save(buf)
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/png", status_code=200)
    

@app.get("/bot/qr/{uuid}")
async def call_qr(uuid: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"http://localhost:8080/whatsapp_session/{uuid}")
        return response.json()
    

@app.get("/bot")
async def findAllBots():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"http://localhost:8080/whatsapp_session")
        return response.json()


@app.get("/hello")
async def hello():
    # Generar el QR con el texto "hola"
    img = qrcode.make("hola")

    # Guardar la imagen en un buffer en memoria
    buf = BytesIO()
    img.save(buf)
    buf.seek(0)

    # Retornar la imagen en la respuesta HTTP
    return StreamingResponse(buf, media_type="image/png")