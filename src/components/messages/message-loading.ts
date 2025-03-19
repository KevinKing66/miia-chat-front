import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('loading-message')
export class LoadingMessage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 1.2rem;
      color: #333;
    }

    .spinner {
      width: 24px;
      height: 24px;
      border: 3px solid rgba(0, 0, 0, 0.2);
      border-top-color: #333;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  text: string;
  index: number;

  constructor() {
    super();
    this.text = "Generando respuesta...";
    this.index = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._startTypingAnimation();
  }

  _startTypingAnimation() {
    setInterval(() => {
      this.index = (this.index + 1) % (this.text.length + 1);
      this.requestUpdate();
    }, 100);
  }

  render() {
    return html`
    <div style="height: 2rem;">
      <span>${this.text.substring(0, this.index)}</span>
    </div>
    `;
  }
}