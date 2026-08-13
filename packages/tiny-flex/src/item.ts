import { getCssVariableName } from "./css-variable";
import { TinyElement, type TinyElementAttribute } from "./tiny";

type TinyItemAttribute =
  | TinyElementAttribute
  | "flex"
  | "grow"
  | "shrink"
  | "basis"
  | "order"
  | "align-self";

const itemAttributes: readonly TinyItemAttribute[] = [
  "flex",
  "grow",
  "shrink",
  "basis",
  "order",
  "align-self",
];

const flexPrefixedAttributes = new Set<TinyItemAttribute>([
  "grow",
  "shrink",
  "basis",
]);

export class TinyItem extends TinyElement {
  static getCss(): string {
    const baseStyles = super.getCss();
    const attributeStyles = itemAttributes
      .map((name) => {
        const property = flexPrefixedAttributes.has(name)
          ? `flex-${name}`
          : name;

        return `:host([${name}]:not([as-child])), :host([as-child][${name}]) ::slotted(*) { ${property}: var(${getCssVariableName(name)}); }`;
      })
      .join(" ");

    return `${baseStyles} ${attributeStyles}`;
  }

  static get observedAttributes(): string[] {
    return [...super.observedAttributes, ...itemAttributes];
  }
}

if (!customElements.get("flex-item")) {
  customElements.define("flex-item", TinyItem);
}
