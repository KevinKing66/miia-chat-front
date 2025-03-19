import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('multiple-file-input')
export class MultipleFileInput extends LitElement {
    static styles = css`
    :host {
      display: block;
    }
    .preview-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }
    .preview {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .file-icon {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      background: #f4f4f4;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  `;

    @state()
    files = [];

    handleFileChange(event) {
        const fileList = event.target.files;
        const fileArray = [];

        Array.from(fileList).forEach((file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                fileArray.push({ name: file.name, type: file.type, data: (e.target as FileReader).result });
                this.files = [...fileArray];
            };
            reader.readAsDataURL(file);
        });
    }

    render() {
        return html`
      <input type="file" multiple @change="${this.handleFileChange}" class="send"><i class="fa-solid fa-paperclip"></i></input>
      <div class="preview-container">
        ${this.files.map(file => html`
          ${file.type.startsWith('image/')
                ? html`<img class="preview" src="${file.data}" alt="${file.name}" />`
                : html`<div class="file-icon">${file.name}</div>`}
        `)}
      </div>
    `;
    }
}
