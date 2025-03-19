import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';


@customElement("side-bar-history-component")
export class HistoryChatsComponent extends LitElement {
    @property()
    history: Array<{ context: string }> = [
        { context: "Como aprendo ingles" },
        { context: "Como ser mejor" }
    ];

    @state()
    isActive: boolean = true;

    @state()
    filter: string = "";
    
    private refreshFilterValue(e: Event) {
        const input = this.renderRoot.querySelector('#filter') as HTMLInputElement;
        console.log(input.value);
        this.filter = input.value;
    }


    toggleSidebar() {
        this.isActive = !this.isActive;
    }

    render() {
        return html`
        <div class="history-container" id="historyContainer" class=${this.isActive ? "show" : ""}>
            <div class="menu-icon" @click="${this.toggleSidebar}">
                <!-- <i class="fas fa-bars"></i> -->
                menu
            </div>

            <div class="sidebar" class=${this.isActive ? "show" : ""} id="sidebar">
                <div class="history-chat-options">
                    <input type="text" placeholder="buscar" id="filter" class="filter" class=${this.isActive ? "show" : ""}/>
                    <button @click="${this.refreshFilterValue}">Filtrar</button>
                </div>

                <div class="title">
                    <h2>historial</h2>
                </div>

                <div class="historial" id="historial">
                    <div class="history-item">Conversación de prueba</div>
                    ${this.history
                        .filter(chat => this.filter.trim().length === 0 || 
                        chat.context.toLocaleLowerCase().includes(this.filter.trim().toLocaleLowerCase()))
                        .map(chat => html`<div class="history-item">${chat.context}</div>`)
                    }
                </div>
            </div>
        </div>`;
    }

    protected createRenderRoot() {
        return this;
    }
}