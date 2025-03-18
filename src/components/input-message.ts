import { html, LitElement, PropertyValues } from "lit";
import { property, state, customElement, query } from 'lit/decorators.js';
import { AuthResponse, Message, MessageDto, ReplyDTO } from "../dto/chat";
import { SessionStatus } from './../session/session-status';
// import { AxiosResponse } from "axios";
import { ChatService } from "./../service/chat-service";
// import GlobalConfig from '../global/global-config';

@customElement("input-message-component")
export class InputMessageComponent extends LitElement {

    @property()
    private messages: Array<Message> = [];

    @query("#chatInput") textarea!: HTMLInputElement;

    @state()
    status: "LOCK" | "FREE" = "FREE";

    service: ChatService = ChatService.getInstance();

    private updateMessage(message: Message) {
        this.messages = [...this.messages, message];
        this.dispatchEvent(new CustomEvent('messages-updated', {
            detail: [...this.messages],
            bubbles: true,
            composed: true
        }));
    }


    private sendMessage(): void {
        if (this.status === "LOCK") {
            return;
        }
        this.status = "LOCK";
        if (this.textarea.value.trim()) {
            let credential = SessionStatus.getInstance().getCredentials();
            this.updateMessage({ text: this.textarea.value.trim(), type: 'USER' });
            let now = Math.floor(Date.now() / 1000)
            const body: MessageDto = { to_user_code: credential.userinfo.email, to_user_name: credential.userinfo.nickname, message: this.textarea.value, chatbot_code: "COMTOR", sent_timestamp: now.toString() };
            this.textarea.value = ``;
            this.service.sendMessages(body, this.callback.bind(this), this.onError.bind(this), this.onFinally.bind(this));
        }
    }

    callback(response) {
        const data = response.data;
        const reply: ReplyDTO = JSON.parse(data)[0] as ReplyDTO;
        this.updateMessage({ text: reply.answer, type: 'BOT' });
    }

    onError(error: Error) {

    }

    onFinally() {
        this.status = "FREE";
    }


    handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" && this.status === "FREE") {
            this.sendMessage();
        }
    }


    render() {
        return html`        
        <div class="input-container">
          <textarea id="chatInput" class="chat-input" placeholder="Escribe un mensaje..." rows="1" style="resize: true;" @keydown=${this.handleKeyDown}></textarea>
          <button @click="${this.sendMessage}" ?hidden=${this.status === "LOCK"}>Enviar</button>
        </div>`;
    }

    protected createRenderRoot() {
        return this;
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (this.textarea) {
            this.textarea.addEventListener('input', this.autoResize.bind(this));
            this.autoResize();
        }
    }


    autoResize() {
        this.textarea.style.height = 'auto';
        this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    }
}