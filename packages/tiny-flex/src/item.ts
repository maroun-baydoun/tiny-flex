import { getCssVariableName, TinyElement } from "./tiny";

export class TinyItem extends TinyElement {
  static getCss(): string {
    return ["flex", "grow", "shrink", "basis", "order", "align-self"].map((name) => {
      const property = name === "grow" ? "flex-grow" : name === "shrink" ? "flex-shrink" : name === "basis" ? "flex-basis" : name;
      return `:host([${name}]) { ${property}: var(${getCssVariableName(name)}); }`;
    }).join(" ");
  }

  static get observedAttributes(): string[] { return ["flex", "grow", "shrink", "basis", "order", "align-self"]; }
}

if (!customElements.get("flex-item")) customElements.define("flex-item", TinyItem);
