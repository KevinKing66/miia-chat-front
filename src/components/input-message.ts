import { html, LitElement } from "lit";
import { property, state, customElement, query } from 'lit/decorators.js';
import { AuthResponse, Message, MessageDto, ReplyDTO } from "../dto/chat";

import { SessionStatus } from './../session/session-status';

@customElement("input-message-component")
export class InputMessageComponent extends LitElement{
    readonly ngrok_url = "https://equal-katydid-harmless.ngrok-free.app";
    readonly miia_url = "https://miia.comtor.net/miiaapi/chatbot-web/";

    @property() 
    private messages: Array<Message> = [];

    @query("#chatInput") textarea!: HTMLInputElement;

    @state()
    status: "LOCK" | "FREE" = "FREE";

    
    private updateMessage(message: Message) {
        this.messages = [...this.messages, message];
        this.dispatchEvent(new CustomEvent('messages-updated', {
            detail: [...this.messages],
            bubbles: true,
            composed: true
        }));
        console.log("mensajes desde input_msg: ", this.messages);
    }

    getCredentials(): AuthResponse{
        let credentials: AuthResponse = JSON.parse(sessionStorage.credentials);
        return credentials;
    }

    private sendMessage(): void {
        if(this.status === "LOCK"){
            return;
        }
        this.status = "LOCK";
        if (this.textarea.value.trim()) {
            // let credential = SessionStatus.getCredentials();
            let credential = this.getCredentials();
            this.updateMessage({ text: this.textarea.value.trim(), type: 'USER' });
            let now = Math.floor(Date.now() / 1000)
            const body: MessageDto = { to_user_code: credential.userinfo.email, to_user_name: credential.userinfo.nickname, message: this.textarea.value, chatbot_code: "COMTOR", sent_timestamp: now.toString() };
            this.textarea.value = ``;
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
                const reply: ReplyDTO = JSON.parse(data)[0] as ReplyDTO;
                this.updateMessage({ text: reply.answer, type: 'BOT' });
            })
            .finally(() => {
                this.status = "FREE";
            });
        }
    }


    handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" && this.status === "FREE") {
            console.log("Enter pressed:", this.textarea.value);
            this.sendMessage();
        }
    }


    render(){
        return html`        
        <div class="input-container">
          <textarea id="chatInput" placeholder="Escribe un mensaje..." rows="1" style="resize: true;" @keydown=${this.handleKeyDown}></textarea>
          <button @click="${this.sendMessage}" ?hidden=${this.status === "LOCK"}>Enviar</button>
        </div>`;
    }

    protected createRenderRoot() {
        return this;
    }
}