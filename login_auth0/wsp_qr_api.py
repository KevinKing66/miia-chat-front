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
        data = response.json()
        qr = data.get("qr")
        status = data.get("status")
        status = data.get("status")
        resp.status_code = response.status_code
        if(response.status_code != 200):
            msg = data.get("message")
    
    if status == "BOT_CONNECTED" or status == "NON-EXISTENT_QR":
        return {"message": status}
    
    if  qr == None:
        return {"message": "No se ha podido generar el QR"}
    
    if  status == None:
        # resp.status_code = 500
        return {"message": "Error con el servidor"}

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