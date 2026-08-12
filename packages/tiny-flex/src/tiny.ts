export function getCssVariableName(name: string): string {
  return `--tf-${name}`;
}

export abstract class TinyElement extends HTMLElement {
  public constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = (this.constructor as typeof TinyElement).getCss();
    shadowRoot.append(style, document.createElement("slot"));
    this.setStyleProperty = this.setStyleProperty.bind(this);
  }

  static getCss(): string { return ""; }

  setStyleProperty(property: string, value: string | null): void {
    if (value === null) this.style.removeProperty(property);
    else this.style.setProperty(property, value);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue !== newValue) this.setStyleProperty(getCssVariableName(name), newValue);
  }
}
