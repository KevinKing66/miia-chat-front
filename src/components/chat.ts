import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { v4 as uuidv4 } from "uuid";
import { AuthResponse, Message, MessageDto, ReplyDTO } from '../dto/chat';

@customElement("chat-component")
export class ChatComponent extends LitElement {
  @state()
  ngrok_url: string = "https://equal-katydid-harmless.ngrok-free.app";

  // miia_url: string = "https://miia.comtor.net:9192/chatbot-web/";
  miia_url: string = "http://127.0.0.1:9192/chatbot-web/";

  @state() private messages: Array<Message> = [];
  @query("#chatInput") input!: HTMLInputElement;


  private fetchData(): void{
    fetch(`${this.ngrok_url}/user-info`)
  .then(response => response.json())
  // .then(data => {console.log("Data: ", data)})
  .then(data => {
    sessionStorage.credentials = JSON.stringify(data);
    let msg: Message = { text: `Hola ${data.userinfo.nickname}, ¿Cómo puedo ayudarte hoy?`, type: 'BOT' }
    this.messages = [msg];

  })
  .catch(error => console.error("Error en la solicitud:", error));
  }

  private getCredentials(): AuthResponse{
    let credentials: AuthResponse = JSON.parse(sessionStorage.credentials);
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
      fetch(this.miia_url, reqInit)
        .then(resp => resp.json())
        .then(data => {
          console.log("Respuesta:");
          console.log(JSON.stringify(data))
          const reply: ReplyDTO = JSON.parse(data)[0] as ReplyDTO;
          console.log("Reply: ", reply)
          this.messages = [...this.messages, { text: reply.answer, type: 'BOT' }];
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
    await this.fetchData();
  }

  protected createRenderRoot() {
    return this;
  }
}
