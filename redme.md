Necesitamos 3 terminales
1. compilacion
2. correr servidor
3. usar ngrok

antes de eso necesitamos configurar el ngrok, ejecuta el siguiente comando:
`ngrok config add-authtoken 2u8klej9eu7x9r4KaeQBZtgymtE_6NWDJkS8EkasRsaUWVz9Q`

1. Compilamos nuestro prpyeto con: 
`npx webpack --config webpack.config.js --watch`
2. corremos el proyecto usando uvicorn: 
`python3 -m uvicorn web_server_dummy:app --host 127.0.0.1 --port 3000 --reload`
3. iniciamos ngrok con el siguiente comando: 
`ngrok http --url=equal-katydid-harmless.ngrok-free.app 3000`