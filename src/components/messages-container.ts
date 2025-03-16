import { html, LitElement, PropertyValues } from 'lit';
import { property, state, customElement, query } from 'lit/decorators.js';
import { Message } from '../dto/chat';

@customElement("messages-container")
export class MessageContainer extends LitElement{

    @property() 
    private messages: Array<Message> = [];

    @query("#chatContainerMsg") chatContainer!: HTMLElement;
      
      private scrollToBottom() {

          if (this.chatContainer) {
              requestAnimationFrame(() => {
                  this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
              });
          }
      }
    
      protected firstUpdated(_changedProperties: PropertyValues): void {
        this.scrollToBottom();
      }
      
      updated(changedProperties: Map<PropertyKey, unknown>) {
        if (changedProperties.has("messages")) {
          console.log("Se actualizaron los mensajes");
        }
        this.scrollToBottom();
      }

    protected render() {
        return html`
          <div class="chat-container-msg" id="chatContainerMsg">
            ${this.messages.map(
                msg => html`<message-component class="message ${msg.type.toLocaleLowerCase()}" .msg="${msg}"></message-component>`
            )}
          </div>`;
    }

    protected createRenderRoot() {
        return this;
    }
}