import { LitElement, TemplateResult, html} from "lit";
import {  customElement, property, state } from 'lit/decorators.js';
// import { SessionStatus } from "../session/session-status";
import { OptionMenu } from "../entity/advanced-html-entities";


@customElement('user-status-widget')
export class UserWidgetStatus extends LitElement {
    @state() popupVisible: boolean = false;
    @property({type: String}) username: string = "";

    getOptions(): OptionMenu[] {
        let options: OptionMenu[] = [];

        return options;
    }

    renderMenuOptions(): TemplateResult {
        if(this.getOptions().length > 0){
            return html`${this.getOptions().map((option) => html`<a @click=${option.action}>${option.title}</a>`)}`;
        }
        return html``;
    }

    render(){
        return html`
        <div class="dropdown">
            <a href="#" title="Salir">
                <i class="bi bi-person"></i>
            </a>
            <div class="dropdown-menu">
                ${this.renderMenuOptions()}                    
                <a href="/logout" id="qsLogoutBtn" style="color: white;">Cerrar sesión</a>
            </div>
        </div>
        
        `;
        
    }

    closeSession(event: PointerEvent){
        // SessionStatus.getInstance().removeSession();
    }

    createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}