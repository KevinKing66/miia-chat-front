from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
import httpx
import qrcode
from io import BytesIO

app = FastAPI()

@app.get("/qr/generate/")
async def call_qr():
    async with httpx.AsyncClient() as client:
        response = await client.get("http://localhost:8080/qr")
        return response.json()

@app.get("/qr/generate/image")
async def show_qr(resp: Response):
    qr = None
    status = None
    msg = None
    async with httpx.AsyncClient() as client:
        response = await client.get("http://localhost:8080/qr")
        print(response.json())
        resp.status_code = response.status_code
        qr = response.json().get("qr")
        msg = response.json().get("message")
    
    if status == "NON-EXISTENT_QR" or status == None:
        resp.status_code = 404
        return {"message": msg}
    
    if status == "BOT_CONNECTED" or qr == None:
        return {"message": msg}
    
    # Generar el QR con el texto "hola"
    img = qrcode.make(qr)

    # Guardar la imagen en un buffer en memoria
    buf = BytesIO()
    img.save(buf)
    buf.seek(0)

    # Retornar la imagen en la respuesta HTTP
    return StreamingResponse(buf, media_type="image/png")
    
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