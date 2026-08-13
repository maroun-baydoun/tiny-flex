import { getCssVariableName, TinyElement } from "./tiny";

type TinyContainerAttribute =
  | "direction"
  | "align-items"
  | "align-content"
  | "justify-content"
  | "wrap"
  | "flow"
  | "gap"
  | "row-gap"
  | "column-gap";

const containerAttributes: TinyContainerAttribute[] = [
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
    return `:host { display: flex; } :host([inline]) { display: inline-flex; } ${containerAttributes
      .map((name) => {
        const property = flexPrefixedAttributes.has(name)
          ? `flex-${name}`
          : name;

        return `:host([${name}]) { ${property}: var(${getCssVariableName(name)}); }`;
      })
      .join(" ")}`;
  }

  static get observedAttributes(): string[] {
    return containerAttributes;
  }
}

if (!customElements.get("flex-container"))
  customElements.define("flex-container", TinyContainer);
