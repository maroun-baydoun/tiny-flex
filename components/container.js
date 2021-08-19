import { TinyElement, getCssVariableName } from "./tiny.js";

export class TinyContainer extends TinyElement {
  static getCss() {
    return `
      :host {
        display: flex;
      }
      
      :host([inline]) {
        display: inline-flex;
      }

      :host([direction]) {
        flex-direction: var(${getCssVariableName("direction")});
      }

      :host([align-items]) {
        align-items: var(${getCssVariableName("align-items")});
      }

      :host([align-content]) {
        align-content: var(${getCssVariableName("align-content")});
      }

      :host([justify-content]) {
        justify-content: var(${getCssVariableName("justify-content")});
      }

      :host([wrap]) {
        flex-wrap: var(${getCssVariableName("wrap")});
      }

      :host([flow]) {
        flex-flow: var(${getCssVariableName("flow")});
      }

      :host([gap]) {
        gap: var(${getCssVariableName("gap")});
      }

      :host([row-gap]) {
        row-gap: var(${getCssVariableName("row-gap")});
      }

      :host([column-gap]) {
        column-gap: var(${getCssVariableName("column-gap")});
      }
    `;
  }

  static get observedAttributes() {
    return [
      "direction",
      "align-items",
      "align-content",
      "justify-content",
      "wrap",
      "flow",
      "gap",
      "row-gap",
      "column-gap",
    ];
  }
}

window.customElements.define("flex-container", TinyContainer);
