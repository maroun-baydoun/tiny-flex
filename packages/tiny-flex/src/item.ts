import { getCssVariableName, TinyElement } from "./tiny";

type TinyItemAttribute =
  "flex" | "grow" | "shrink" | "basis" | "order" | "align-self";

const itemAttributes: TinyItemAttribute[] = [
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
    return itemAttributes
      .map((name) => {
        const property = flexPrefixedAttributes.has(name)
          ? `flex-${name}`
          : name;

        return `:host([${name}]) { ${property}: var(${getCssVariableName(name)}); }`;
      })
      .join(" ");
  }

  static get observedAttributes(): string[] {
    return itemAttributes;
  }
}

if (!customElements.get("flex-item"))
  customElements.define("flex-item", TinyItem);
