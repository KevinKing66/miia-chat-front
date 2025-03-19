import { html, LitElement } from "lit";
import { property, state, customElement } from 'lit/decorators.js';
import { Message } from "../../dto/chat";

@customElement("message-component")
export class MessageComponent extends LitElement {
    @property({ type: Object })
    msg?: Message;

    private parseText(text?: string): string {
        if (text == null) {
            return '';
        }

        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrita
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Cursiva
            .replace(/`([\s\S]*?)`/g, (_, code) => {
                const escapedCode = code.replace(/&/g, '&amp;') // Escapar caracteres especiales
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');

                return `
        <div class="code-container">
          <!--- <button class="copy-btn" @click=${() => this.copyToClipboard(code)}>📋</button> ---!>
          <pre><code>${escapedCode}</code></pre>
        </div>`;
            });
    }

    private copyToClipboard(text: string = this.msg!.text) {
        navigator.clipboard.writeText(text)
            .then(() => console.log("Texto copiado:", text))
            .catch(err => console.error("Error al copiar:", err));
    }

    render() {
        return html`
            <div class="message-options-container">
                <p .innerHTML=${this.parseText(this.msg?.text)}></p>
                <options-messages-component .msg=${this.msg}></options-messages-component>
            </div>
            `;
    }

    protected createRenderRoot() {
        return this;
    }
}