import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('multiple-file-input')
export class MultipleFileInput extends LitElement {
    static styles = css`
    :host {
      display: block;
    }
    .upload-container {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .preview-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
      max-height: 200px;
      overflow-y: auto;
    }
    .preview-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
    }
    .preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .delete-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      background: red;
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      cursor: pointer;
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
    input[type="file"] {
      display: none;
    }
    .icon {
      font-size: 24px;
      color: #555;
    }
  `;

    @state()
    files = [];

    handleFileChange(event) {
        const fileList = event.target.files;
        const fileArray = [...this.files];

        Array.from(fileList).forEach((file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                fileArray.push({ name: file.name, type: file.type, data: e.target.result });
                this.files = [...fileArray];
            };
            reader.readAsDataURL(file);
        });
    }

    removeFile(index) {
        this.files = this.files.filter((_, i) => i !== index);
    }

    render() {
        return html`
      <label class="upload-container">
        <i class="fa-solid fa-paperclip icon"></i>
        <input type="file" multiple @change="${this.handleFileChange}" hidden />
      </label>
      <div class="preview-container">
        ${this.files.map((file, index) => html`
          <div class="preview-wrapper">
            ${file.type.startsWith('image/')
                ? html`<img class="preview" src="${file.data}" alt="${file.name}" />`
                : html`<div class="file-icon">${file.name}</div>`}
            <button class="delete-btn-img" @click="${() => this.removeFile(index)}">×</button>
          </div>
        `)}
      </div>
    `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}