import { html, LitElement, PropertyValues } from "lit";
import { property, state, customElement, query } from 'lit/decorators.js';
import { AuthResponse, Message, MessageDto, ReplyDTO } from "../../dto/chat";
import { SessionStatus } from '../../session/session-status';
import { ChatService } from "../../service/chat-service";
import { AxiosError } from "axios";
// import GlobalConfig from '../global/global-config';

@customElement("input-message-component")
export class InputMessageComponent extends LitElement {

    @property()
    private messages: Array<Message> = [];

    @query("#chatInput") textarea!: HTMLInputElement;

    @property()
    status: "LOADING" | "FREE" = "FREE";
    
    @state()
    error: AxiosError | null = null;

    service: ChatService = ChatService.getInstance();

    private updateMessage(message: Message) {
        this.messages = [...this.messages, message];
        this.dispatchEvent(new CustomEvent('messages-updated', {
            detail: [...this.messages],
            bubbles: true,
            composed: true
        }));
    }

    private updateStatus(status: "LOADING" | "FREE") {
        this.status = status;
        this.dispatchEvent(new CustomEvent('status-update', {
            detail: status,
            bubbles: true,
            composed: true
        }));
    }


    private sendMessage(): void {
        if (this.status === "LOADING") {
            return;
        }

        if (this.textarea.value.trim()) {
            this.updateStatus("LOADING");
            let credential = SessionStatus.getInstance().getCredentials();
            this.updateMessage({ text: this.textarea.value.trim(), type: 'USER' });
            let now = Math.floor(Date.now() / 1000)
            const body: MessageDto = { to_user_code: credential.userinfo.email, to_user_name: credential.userinfo.nickname, from_user_code: credential.userinfo.email, from_user_name: credential.userinfo.nickname, message: this.textarea.value, chatbot_code: "COMTOR", sent_timestamp: now.toString() };
            this.clearTextArea();
            this.service.sendMessages(body, this.callback.bind(this), this.onError.bind(this), this.onFinally.bind(this));
        }
    }

    callback(response) {
        const data = response.data;
        const reply: ReplyDTO = JSON.parse(data)[0] as ReplyDTO;
        
        this.updateMessage({ text: reply.answer, type: 'BOT' });
    
    // // MANERA DE CARGAR TODAS LAS RESPUESTAS
    //     const replyies: ReplyDTO = JSON.parse(data)[0] as ReplyDTO;

    //   let mesaggesList: Message[] = [];
    //   for(let r of replyies){
    //     const msg = new Message(r.answer, "USER");
    //     mesaggesList.push(msg);
    //   }
    //   this.updateMessage(mesaggesList);
    }

    onError(error: AxiosError) {
        this.error = error;
    }

    onFinally() {
        this.updateStatus("FREE");
    }

    updateError(event: CustomEvent) {
        this.error = event.detail;
    }

    clearTextArea(){
        this.textarea.value = ''.trim();
        this.textarea.innerHTML = '';
        this.textarea.textContent = '';  
    }


    handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" && this.status === "FREE") {
            this.sendMessage();
        }
    }


    render() {
        return html`
        <div class="inputs-container">
            <div class="input-wrap-container">
                <textarea id="chatInput" class="chat-input" placeholder="Escribe un mensaje..." rows="1" style="resize: true;" @keydown=${this.handleKeyDown}></textarea>
                <button class="send" @click="${this.sendMessage}" title="Enviar mensaje" ?hidden=${this.status === "LOADING"}><i class="fa-solid fa-paper-plane"></i></button>
            </div>
            <multiple-file-input></multiple-file-input>
            <modal-error .error="${this.error}" @update-error="${this.updateError}"></modal-error>
        </div>
        `;
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