import { TinyElement, getCssVariableName } from "./tiny.js";

export class TinyItem extends TinyElement {
  static getCss() {
    return `  
      :host([flex]) {
        flex: var(${getCssVariableName("flex")});
      }

      :host([grow]) {
        flex-grow: var(${getCssVariableName("grow")});
      }

      :host([shrink]) {
        flex-shrink: var(${getCssVariableName("shrink")});
      }

      :host([basis]) {
        flex-basis: var(${getCssVariableName("basis")});
      }

      :host([order]) {
        order: var(${getCssVariableName("order")});
      }

      :host([align-self]) {
        align-self: var(${getCssVariableName("align-self")});
      }
    `;
  }

  static get observedAttributes() {
    return ["flex", "grow", "shrink", "basis", "order", "align-self"];
  }
}

window.customElements.define("flex-item", TinyItem);
