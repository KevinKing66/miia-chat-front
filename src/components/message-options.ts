import { html, LitElement } from "lit";
import { property, state, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Message } from "../dto/chat";

@customElement("options-messages-component")
export class MessageComponent extends LitElement {
    @property({ type: Object })
    msg?: Message;
    @state()
    reaction: "NONE" | "LIKE" | "DISLIKE" = "NONE";

    private copyToClipboard(text: string = this.msg!.text) {
        navigator.clipboard.writeText(text)
            .then(() => console.log("Texto copiado:", text))
            .catch(err => console.error("Error al copiar:", err));
    }

    likeMessage() {
        this.reaction = "LIKE";
        console.log("like");
    }

    dislikeMessage() {
        this.reaction = "DISLIKE";
        console.log("dislike");
    }

    generateNewResponse() {
        console.log("new response");
    }

    render() {
        return html`
        ${this.msg?.type == "BOT" ? 
            html`
            <div class="message-options">
                <button class="option-btn" @click=${() => this.copyToClipboard()} title="Copiar"><i class="fa-regular fa-copy"></i></button>
                
                <button class="${classMap({ 'option-btn': true, 'active': this.reaction === 'LIKE' })}"  @click=${() => this.likeMessage()}  title="Like">
                    <i class="fa-regular fa-thumbs-up"></i>
                </button>
                
                <button class="${classMap({ 'option-btn': true, 'active': this.reaction === 'DISLIKE' })}" @click=${() => this.dislikeMessage()} title="No me gustó">
                    <i class="fa-regular fa-thumbs-down"></i>
                </button>

                <button class="option-btn" @click=${() => this.copyToClipboard()} title="Nueva respuesta"><i class="fa-solid fa-rotate-right"></i></button>
            </div>
            ` 
            : html``}`;
    }

    protected createRenderRoot() {
        return this;
    }
}