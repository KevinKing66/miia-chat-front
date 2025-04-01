from fastapi import FastAPI
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
async def show_qr():
    qr = None
    async with httpx.AsyncClient() as client:
        response = await client.get("http://localhost:8080/qr")
        print(response.json())
        qr = response.json().get("qr")
    
    if qr == None:
        return {"error": "No se pudo obtener el QR"}
    
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