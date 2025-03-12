Necesitamos 3 terminales
1. compilacion
2. correr servidor
3. usar ngrok

1. Compilamos nuestro prpyeto con: 
´npx webpack --config webpack.config.js --watch´
2. corremos el proyecto usando uvicorn: 
´python3 -m uvicorn web_server_dummy:app --host 127.0.0.1 --port 3000 --reload´
3. iniciamos ngrok con el siguiente comando: 
´ngrok http --url=equal-katydid-harmless.ngrok-free.app 3000´