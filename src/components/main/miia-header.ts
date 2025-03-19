import { LitElement, html } from "lit";
import { customElement, property } from 'lit/decorators.js';

@customElement('miia-header')
export class MiiaHeader extends LitElement {
    
    protected render() {

        return html`
        <!-- <div class="header" style="display: flex; color: white; align-items: center;justify-content: space-between;background-color:var(--fourh-color);padding: 5px;font:1.2rem Fira Sans,sans-serif;">
            <div style="display: flex;flex-direction: row;">
                <h1><strong>MIIA</strong></h1>
                <img src="assets/logo_horizontal.png" alt="" srcset="" style="height: 2rem;">
            </div>
            <div style="margin-left: 10px;font-size: 1.5rem;">                    
                <a href="/logout" id="qsLogoutBtn" style="color: white;"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
            </div>
        </div> -->
        <nav class="row navbar navbar-scrolled" style="--bs-gutter-x:0;">
            <div class="col-3">
                <a class="navbar-brand" href="#">
                    <img src="media/images/logo-white.svg"  alt="Comtor" style="margin: 10px 5px 5px 10px; height: 40px; ">
                </a>
           
                </div>
            <div class="profile-options col-6 justify-content-end">
                <user-status-widget></user-status-widget> 
            </div>    
        </nav>
        `;
    }


    createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}
