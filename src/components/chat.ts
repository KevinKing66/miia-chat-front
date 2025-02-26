import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { MessageDto, AnswerInDto } from '../dto/chat';
import { v4 as uuidv4 } from "uuid";
import { Message } from '../entity/entity';

@customElement("chat-component")
export class ChatComponent extends LitElement {
  @property()
  uuid: string = uuidv4();

  @state() private messages: Array<Message> = [
    { text: 'Hola, ¿cómo puedo ayudarte?', type: 'BOT' },
    { text: 'Quisiera información sobre tu servicio.', type: 'USER' },
    { text: 'Claro, ofrecemos asistencia basada en IA para responder preguntas.', type: 'BOT' }
  ];
  @query("#chatInput") input!: HTMLInputElement;

  private sendMessage(): void {
    if (this.input.value.trim()) {
      
      this.messages = [...this.messages, { text: this.input.value, type: 'USER' }];
      const body: MessageDto = { uuid_conversation: this.uuid, message: this.input.value, bot: "" };
      this.input.value = '';
      const reqInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
      fetch("http://localhost:3000/message", reqInit)
        .then(resp => resp.json())
        .then(data => {
          console.log("Respuesta:");
          console.log(JSON.stringify(data))
          const answer: AnswerInDto = data as AnswerInDto;
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
