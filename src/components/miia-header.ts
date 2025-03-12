import { LitElement, html } from "lit";
import { customElement, property } from 'lit/decorators.js';

@customElement('miia-header')
export class MiiaHeader extends LitElement {
    
    protected render() {

        return html`
        <nav class="row navbar navbar-scrolled">
            <div class="col-3">
                <a class="navbar-brand" href="#">
                    <img src="media/images/logo-white.svg"  alt="Comtor" style="margin: 10px 5px 5px 10px; height: 40px; ">
                </a>
           
                </div>
            <div class="profile-options col-6 justify-content-end">
                <user-status-widget></user-status-widget> 
            </div>    
        </nav>`;
    }


    createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}
