import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { v4 as uuidv4 } from "uuid";
import { AuthResponse, Message, MessageDto, ReplyDTO } from '../dto/chat';

@customElement("chat-component")
export class ChatComponent extends LitElement {
  @property()
  user_code: string = "";
  @property()
  user_name: string = "";
  @state()
  ngrok_url: string = "https://572b-181-32-111-185.ngrok-free.app";



  @state() private messages: Array<Message> = [
    { text: 'Hola, ¿cómo puedo ayudarte?', type: 'BOT' },
  ];
  @query("#chatInput") input!: HTMLInputElement;


  private fetchData(){
    fetch(`https://dev-kevin-v2002.us.auth0.com/authorize?response_type=code&client_id=qOSvTGx7HbDLiEOxRI6a1BnTidplEWGD&redirect_uri=${encodeURI(this.ngrok_url)}&scope=openid+profile+email&state=VOQwuYPTuPiqtEOwWhLZiB47Ld2ydO&nonce=ngKTzD30qPeMuupgC3UF`, {
      method: "GET",
      credentials: "include",  // Incluye cookies en la solicitud si es necesario
      headers: {
          "Origin": `${this.ngrok_url}/login`,
          "mode": 'no-cors',
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
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

  private getCredentials(): AuthResponse{
    let credentials: AuthResponse = JSON.parse(sessionStorage.credentials);
    if(!credentials){
      return {
        "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYta2V2aW4tdjIwMDIudXMuYXV0aDAuY29tLyJ9..06ZTUtSxX_KdwfeV.whu-2pGOrFaCWATJyFWIFYNSc1bQ-CayepNLUt3XUfV-xYy5qXKmTp8WNPjK329VphhQ6V9phLVkjvObx_2onjVLjE9JVM52kS5MkV7pA-xMwgZ42KE8jtUx3raJlXhMd5au8nifNAGhSXFrrCiDnmd35QsHJAVuIw-Iaca4Cv2BLdapHwMcx03fOEyRzv8r2qXBOO82Gy8V2cdTj_Skrt7WOZJGvn29x-QSK81ERBrgx29M7imLkBm34mJs_AbTUElFn07inARS2YBwp4tXkWJOl-rjQwImPSJnCbcVKrdUrrHPMxzBXK3j66k9XG16bhIWS50eIE4.BkB7y63jNjeCM5g1UOHlvA",
        "expires_at": 1740965237,
        "expires_in": 86400,
        "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFTeUVfVGppY2JwQUFDV3ljMGNaTCJ9.eyJuaWNrbmFtZSI6ImtldmluIiwibmFtZSI6ImtldmluQGNvbXRvci5uZXQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNGY0NmRiMDM4Y2M3MzUzMWI2YjNiZDc3ZmQyNTIzY2Q_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZrZS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0wMlQwMToyNzoxNi4wMjRaIiwiZW1haWwiOiJrZXZpbkBjb210b3IubmV0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1rZXZpbi12MjAwMi51cy5hdXRoMC5jb20vIiwiYXVkIjoicU9TdlRHeDdIYkRMaUVPeFJJNmExQm5UaWRwbEVXR0QiLCJzdWIiOiJhdXRoMHw2N2MwZDU0Yzc3MTYxYWE2ZjcxZTQ1NjEiLCJpYXQiOjE3NDA4Nzg4MzYsImV4cCI6MTc0MDkxNDgzNiwic2lkIjoiQVNRcXVZNHh3Z2NxdjE2MWdvZ0xydEF2LXlWMjJ6TlAiLCJub25jZSI6InBuM3h2dXlrcjY3cmoxNzNwTjRpIn0.HVOmYjCva69KldhqDGspP32Liaf4JHRgnZVVUbbn5R9f_20tpPzuu8q4Kx1KZZlpyDpthvLNwhEVxU3iG2Q0YImLs4XITaeva9mKFXorccCgQiylqA6KRphMb59odtl62hU78qdOTu-CYMYUTqE7_AoSTtg1aDSZ6O7f_yLN0qloDBjs0n0Z9jYRtYgLqEAgc8SiWSBY1ATGGoLyY7lHuaxKwLTGjW7UVkNZTYuesplloFa58Qd1zX-ld-K5yCic2KtDZrmyDNLN7ysOJDKgmWVKU_-5YAj7_hM9g_ow29a-YqywMTmuwOql51HOsWKoI3qkDdkGHtCqFLw0rw-5IQ",
        "scope": "openid profile email",
        "token_type": "Bearer",
        "userinfo": {
          "aud": "qOSvTGx7HbDLiEOxRI6a1BnTidplEWGD",
          "email": "kevin@comtor.net",
          "email_verified": false,
          "exp": 1740914836,
          "iat": 1740878836,
          "iss": "https://dev-kevin-v2002.us.auth0.com/",
          "name": "kevin@comtor.net",
          "nickname": "kevin",
          "nonce": "pn3xvuykr67rj173pN4i",
          "picture": "https://s.gravatar.com/avatar/4f46db038cc73531b6b3bd77fd2523cd?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fke.png",
          "sid": "ASQquY4xwgcqv161gogLrtAv-yV22zNP",
          "sub": "auth0|67c0d54c77161aa6f71e4561",
          "updated_at": "2025-03-02T01:27:16.024Z"
        }
      } 
    }
    return credentials;
  }
  private sendMessage(): void {
    if (this.input.value.trim()) {
      let credential = this.getCredentials();
      this.messages = [...this.messages, { text: this.input.value, type: 'USER' }];
      let now = Math.floor(Date.now() / 1000)
      const body: MessageDto = { to_user_code: credential.userinfo.email, to_user_name: credential.userinfo.nickname, message: this.input.value, chatbot_code: "SOFI", sent_timestamp: now.toString() };
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

  async connectedCallback() {
    super.connectedCallback(); // Importante llamar al método padre
    // await this.fetchData();
  }

  protected createRenderRoot() {
    return this;
  }
}
