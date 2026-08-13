import { getCssVariableName } from "./css-variable";

export type TinyElementAttribute = "as-child";

const tinyElementAttributes: readonly TinyElementAttribute[] = ["as-child"];

export abstract class TinyElement extends HTMLElement {
  public constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = (this.constructor as typeof TinyElement).getCss();
    shadowRoot.append(style, document.createElement("slot"));
    this.setStyleProperty = this.setStyleProperty.bind(this);
  }

  static getCss(): string {
    return ":host([as-child]) { display: contents; }";
  }

  static get observedAttributes(): string[] {
    return [...tinyElementAttributes];
  }

  setStyleProperty(property: string, value: string | null): void {
    if (value === null) {
      this.style.removeProperty(property);
    } else {
      this.style.setProperty(property, value);
    }
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (name === "as-child") {
      return;
    }

    if (oldValue !== newValue) {
      this.setStyleProperty(getCssVariableName(name), newValue);
    }
  }
}
