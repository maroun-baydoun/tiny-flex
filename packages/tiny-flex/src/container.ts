import { getCssVariableName } from "./css-variable";
import { TinyElement, type TinyElementAttribute } from "./tiny";

type TinyContainerAttribute =
  | TinyElementAttribute
  | "direction"
  | "align-items"
  | "align-content"
  | "justify-content"
  | "wrap"
  | "flow"
  | "gap"
  | "row-gap"
  | "column-gap";

const containerAttributes: readonly TinyContainerAttribute[] = [
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

const flexPrefixedAttributes = new Set<TinyContainerAttribute>([
  "direction",
  "wrap",
  "flow",
]);

export class TinyContainer extends TinyElement {
  static getCss(): string {
    const baseStyles = super.getCss();
    const displayStyles =
      ":host(:not([as-child])), :host([as-child]) ::slotted(*) { display: flex; }";
    const inlineStyles =
      ":host([inline]:not([as-child])), :host([as-child][inline]) ::slotted(*) { display: inline-flex; }";
    const attributeStyles = containerAttributes
      .map((name) => {
        const property = flexPrefixedAttributes.has(name)
          ? `flex-${name}`
          : name;

        return `:host([${name}]:not([as-child])), :host([as-child][${name}]) ::slotted(*) { ${property}: var(${getCssVariableName(name)}); }`;
      })
      .join(" ");

    return `${baseStyles} ${displayStyles} ${inlineStyles} ${attributeStyles}`;
  }

  static get observedAttributes(): string[] {
    return [...super.observedAttributes, ...containerAttributes];
  }
}

if (!customElements.get("flex-container")) {
  customElements.define("flex-container", TinyContainer);
}
