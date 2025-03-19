import { LitElement, TemplateResult, html} from "lit";
import {  customElement, property, state } from 'lit/decorators.js';
import { OptionMenu } from "../../entity/advanced-html-entities";
import { SessionStatus } from "../../session/session-status";


@customElement('user-status-widget')
export class UserWidgetStatus extends LitElement {
    @state() popupVisible: boolean = false;

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
                <p style="color: #444 !important; text-align: center; font-weight: bolder; border-bottom: 2px solid black; padding-bottom: 10px;">${this.getName()}</p>
                ${this.renderMenuOptions()}
                <a href="/logout" id="qsLogoutBtn" style="color: #444 !important;">Cerrar sesión</a>
            </div>
        </div>
        `;
        
    }

    getName(){
        return SessionStatus.getInstance().getCredentials().userinfo.nickname;
    }

    closeSession(event: PointerEvent){
        SessionStatus.getInstance().removeSession();
    }

    createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}