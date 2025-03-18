import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { AuthResponse, Message, MessageDto, ReplyDTO } from '../dto/chat';
import { ChatService } from '../service/chat-service';

@customElement("chat-component")
export class ChatComponent extends LitElement {
    ngrok_url: string;
    miia_url: string;
    service: ChatService;

  constructor() {
    super();
    this.ngrok_url = "https://equal-katydid-harmless.ngrok-free.app";
    this.miia_url = "https://miia.comtor.net/miiaapi/chatbot-web/";
    console.log("ChatComponent show ChatService: ", ChatService);
    this.service = ChatService.getInstance();
  }


  @state() private messages: Array<Message> = [];


  fetchData(): void {
    fetch(`${this.ngrok_url}/user-info`)
      .then(response => response.json())
      .then(data => {
        sessionStorage.credentials = JSON.stringify(data);
        let msg: Message = { text: `Hola ${data.userinfo.nickname}, ¿Cómo puedo ayudarte hoy?`, type: 'BOT' };
        let msg2: Message = { text: "Texto con **negrita**, *cursiva* y `código a copiar`.", type: 'BOT' };
        this.messages = [msg, msg2];
      })
      .catch(error => console.error("Error en la solicitud:", error));
  }

  private updateMessages(event: CustomEvent) {
    console.log("Evento recibido en el padre:", event.detail);
    this.messages = [...event.detail]; // Actualiza los mensajes correctamente
  }



  render() {
    return html`
      <div class="chat-content">

        <messages-container .messages="${this.messages}" class="chat-container"></messages-container>

        <input-message-component .messages="${this.messages}" @messages-updated="${this.updateMessages}"></input-message-component>
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
