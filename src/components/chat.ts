import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { AuthResponse, Message, MessageDto, ReplyDTO } from '../dto/chat';
import { GlobalConfig } from '../global/global-config'; 
import { ChatService } from '../service/chat-service';
import { AuthService } from '../service/auth-service';
import { SessionStatus } from '../session/session-status';

@customElement("chat-component")
export class ChatComponent extends LitElement {
  service: AuthService = new AuthService();;

  @state() private messages: Array<Message> = [];


  loadCredentials(): void {
    this.service.findCredential(this.callback.bind(this), this.onError.bind(this));
  }

  callback(resp) {
    const { data } = resp;
    SessionStatus.getInstance().setCredentials(data);
    let msg: Message = { text: `Hola ${data.userinfo.nickname}, ¿Cómo puedo ayudarte hoy?`, type: 'BOT' };
    let msg2: Message = { text: "Texto con **negrita**, *cursiva* y `código a copiar`.", type: 'BOT' };
    this.messages = [msg, msg2];
  }

  onError(error: Error) {
    console.error("Error en la solicitud:", error);
  }

  private updateMessages(event: CustomEvent) {
    // console.log("Evento recibido en el padre:", event.detail);
    this.messages = [...event.detail];
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
    await this.loadCredentials();
  }

  protected createRenderRoot() {
    return this;
  }
}
