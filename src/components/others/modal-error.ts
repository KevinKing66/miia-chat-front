
import { css, LitElement } from 'lit';
import { html } from 'lit-html';
import { customElement, property, state } from 'lit/decorators.js';
import { AxiosError } from 'axios';

@customElement('modal-error')
export class ErrorModal extends LitElement {
    @property({ type: Boolean }) open = true;
    @state()
    error: AxiosError | null = null;

    static styles = css`
    .modal {
        position: absolute;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: flex !important;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
    }
    .modal.fade {
        background: #00000069;
        backdrop-filter: blur(5px);
    }
  `;

    closeModal() {
        this.error = null;
        this.dispatchEvent(new CustomEvent('update-error'));
    }

    render() {
        return html`
      <div class="modal fade ${this.error != null ? 'show' : ''}" style="${this.error != null ? 'display: block;' : 'display: none;'}">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title">Error</h5>
              <button type="button" class="btn-close" @click="${this.closeModal}"></button>
            </div>
            <div class="modal-body">
              <p>${this.error?.message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="${this.closeModal}">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}


