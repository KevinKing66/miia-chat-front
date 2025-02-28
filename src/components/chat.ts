import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { v4 as uuidv4 } from "uuid";
import { Message, MessageDto, ReplyDTO } from '../dto/chat';

@customElement("chat-component")
export class ChatComponent extends LitElement {
  @property()
  user_code: string = "";
  @property()
  user_name: string = "";


  @state() private messages: Array<Message> = [
    { text: 'Hola, ¿cómo puedo ayudarte?', type: 'BOT' },
    // { text: 'Quisiera información sobre tu servicio.', type: 'USER' },
    // { text: 'Claro, ofrecemos asistencia basada en IA para responder preguntas.', type: 'BOT' }
  ];
  @query("#chatInput") input!: HTMLInputElement;

  private loadCredentials(){
    fetch("https://dev-kevin-v2002.us.auth0.com/authorize?response_type=code&client_id=qOSvTGx7HbDLiEOxRI6a1BnTidplEWGD&redirect_uri=https%3A%2F%2F4497-181-32-111-185.ngrok-free.app%2Fcallback&scope=openid+profile+email&state=VOQwuYPTuPiqtEOwWhLZiB47Ld2ydO&nonce=ngKTzD30qPeMuupgC3UF", {
      method: "GET",
      credentials: "include",  // Incluye cookies en la solicitud si es necesario
      headers: {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-GB,en;q=0.9",
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
          "Referer": "https://4497-181-32-111-185.ngrok-free.app/",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "cross-site",
          "Sec-Fetch-User": "?1",
          "Upgrade-Insecure-Requests": "1"
      }
  })
  .then(response => {
      console.log("Status Code:", response.status);
      console.log("Redirected To:", response.url);
      console.log("Response Body:", response.text());
      return response.text();
  })
  .then(token => fetch(`https://dev-kevin-v2002.us.auth0.com/u/login?state=${token}`))
  .catch(error => console.error("Error en la solicitud:", error));
  }

  private getCredentials(){
    let credentials = sessionStorage.credentials;
    if(!credentials){
      this.loadCredentials();
    }
    return credentials;
  }
  private sendMessage(): void {
    if (this.input.value.trim()) {
      
      this.messages = [...this.messages, { text: this.input.value, type: 'USER' }];
      let now = Math.floor(Date.now() / 1000)
      const body: MessageDto = { to_user_code: this.user_code, from_user_name: undefined, message: this.input.value, chatbot_code: "SOFI", sent_timestamp: now.toString() };
      this.input.value = '';
      const reqInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
      fetch("http://127.0.0.1:9192/chatbot-web/", reqInit)
        .then(resp => resp.json())
        .then(data => {
          console.log("Respuesta:");
          console.log(JSON.stringify(data))
          const answer: ReplyDTO = data as ReplyDTO;
          this.messages = [...this.messages, { text: answer.answer, type: 'BOT' }];
        });
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      console.log("Enter pressed:", this.input.value);
      this.sendMessage();
    }
  }

  render() {
    return html`
      <div class="chat-content">
        <div class="chat-container">
          ${this.messages.map(msg => html`<div class="message ${msg.type.toLocaleLowerCase()}">${msg.text}</div>`)}
        </div>
        <div class="input-container">
          <input id="chatInput" type="text" placeholder="Escribe un mensaje..." @keydown=${this.handleKeyDown}/>
          <button @click="${this.sendMessage}">Enviar</button>
        </div>
      </div>
    `;
  }

  protected createRenderRoot() {
    return this;
  }
}
