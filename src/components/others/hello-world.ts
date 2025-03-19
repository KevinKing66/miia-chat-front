import { html, LitElement } from "lit";
import { customElement, property, query, state } from 'lit/decorators.js';


@customElement("hello-world")
export class HelloWorld extends LitElement{
    constructor(){
        super();
        console.log("HelloWorld constructor");
    }
    render(){
        return html`
        <h1>Hello World</h1>
        `;
    }   

}