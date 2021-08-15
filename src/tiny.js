export function getCssVariableName(name) {
  return `--tf-${name}`;
}

export class TinyElement extends HTMLElement {
  constructor() {
    super();

    const style = document.createElement("style");
    style.appendChild(document.createTextNode(this.constructor.getCss()));

    const slot = document.createElement("slot");

    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(slot);

    this.setStyleProperty = this.setStyleProperty.bind(this);
  }

  static getCss() {
    return "";
  }

  setStyleProperty(property, value) {
    this.shadowRoot.host.style.setProperty(property, value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this.setStyleProperty(getCssVariableName(name), newValue);
  }
}
