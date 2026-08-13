import { beforeEach, describe, expect, it } from "vitest";

function element<T extends HTMLElement>(tag: string): T {
  return document.createElement(tag) as T;
}

describe("tiny-flex custom elements", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("registers both public elements", () => {
    expect(customElements.get("flex-container")).toBeDefined();
    expect(customElements.get("flex-item")).toBeDefined();
  });

  it("creates a flex container and reflects attributes to CSS variables", () => {
    const container = element("flex-container");
    const attributes = {
      direction: "column",
      "align-items": "center",
      "align-content": "space-between",
      "justify-content": "center",
      wrap: "wrap",
      flow: "row wrap",
      gap: "1rem",
      "row-gap": "2rem",
      "column-gap": "3rem",
    };

    for (const [name, value] of Object.entries(attributes)) {
      container.setAttribute(name, value);
    }

    document.body.append(container);

    for (const [name, value] of Object.entries(attributes)) {
      expect(container.style.getPropertyValue(`--tf-${name}`)).toBe(value);
    }

    expect(container.shadowRoot?.querySelector("slot")).toBeTruthy();

    const styles = container.shadowRoot?.querySelector("style")?.textContent;
    const cssProperties = {
      direction: "flex-direction",
      "align-items": "align-items",
      "align-content": "align-content",
      "justify-content": "justify-content",
      wrap: "flex-wrap",
      flow: "flex-flow",
      gap: "gap",
      "row-gap": "row-gap",
      "column-gap": "column-gap",
    };

    for (const [name, property] of Object.entries(cssProperties)) {
      expect(styles).toContain(
        `:host([${name}]) { ${property}: var(--tf-${name}); }`,
      );
    }

    expect(styles).toContain(":host([inline]) { display: inline-flex; }");
  });

  it("removes CSS variables when attributes are removed", () => {
    const item = element("flex-item");
    item.setAttribute("grow", "2");
    item.removeAttribute("grow");
    expect(item.style.getPropertyValue("--tf-grow")).toBe("");
  });
});
