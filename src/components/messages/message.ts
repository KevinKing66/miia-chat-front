import { html, LitElement } from "lit";
import { property, state, customElement } from 'lit/decorators.js';
import { Message } from "../../dto/chat";

@customElement("message-component")
export class MessageComponent extends LitElement {
    @property({ type: Object })
    msg?: Message;

    @state()
    private displayedText: string = "";

    private parseText(text: string): string {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrita
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Cursiva
            .replace(/`([\s\S]*?)`/g, (_, code) => {
                const escapedCode = code.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');

                return `
        <div class="code-container">
          <pre><code>${escapedCode}</code></pre>
        </div>`;
            });
    }

    connectedCallback() {
        super.connectedCallback();
        this._startTypingAnimation();
    }

    private _startTypingAnimation() {
        if (!this.msg?.text) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < this.msg!.text.length) {
                this.displayedText = this.msg!.text.substring(0, index + 1);
                index++;
            } else {
                clearInterval(interval); // Detiene la animación cuando el texto está completo
            }
        }, 8);
    }

    render() {
        return html`
            <div class="message-options-container">
                ${
                    this.msg?.type === "BOT" ? html`<p .innerHTML=${this.parseText(this.displayedText)}></p>` 
                    : html`<p .innerHTML=${this.parseText(this.msg?.text)}></p>`
                }
                <options-messages-component .msg=${this.msg}></options-messages-component>
            </div>
        `;
    }

    protected createRenderRoot() {
        return this;
    }
}