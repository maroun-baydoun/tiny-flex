import { getCssVariableName, TinyElement } from "./tiny";

export class TinyContainer extends TinyElement {
  static getCss(): string {
    return `:host { display: flex; } :host([inline]) { display: inline-flex; } ${[
      "direction", "align-items", "align-content", "justify-content", "wrap", "flow", "gap", "row-gap", "column-gap",
    ].map((name) => `:host([${name}]) { ${name === "direction" ? "flex-direction" : name}: var(${getCssVariableName(name)}); }`).join(" ")}`;
  }

  static get observedAttributes(): string[] {
    return ["direction", "align-items", "align-content", "justify-content", "wrap", "flow", "gap", "row-gap", "column-gap"];
  }
}

if (!customElements.get("flex-container")) customElements.define("flex-container", TinyContainer);
