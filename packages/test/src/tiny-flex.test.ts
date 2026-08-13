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

  describe("flex-container", () => {
    it("assigns a slotted element and exposes its as-child styles", () => {
      const container = element("flex-container");
      const slotted = document.createElement("section");
      container.setAttribute("as-child", "");
      container.setAttribute("direction", "column");
      container.append(slotted);
      document.body.append(container);

      const slot = container.shadowRoot?.querySelector("slot");
      const styles = container.shadowRoot?.querySelector("style")?.textContent;

      expect(slot?.assignedElements()).toEqual([slotted]);
      expect(container.style.getPropertyValue("--tf-direction")).toBe("column");
      expect(styles).toContain(
        ":host([as-child][direction]) ::slotted(*) { flex-direction: var(--tf-direction); }",
      );
    });

    it("reflects all attributes to CSS variables and CSS properties", () => {
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
          `:host([${name}]:not([as-child])), :host([as-child][${name}]) ::slotted(*) { ${property}: var(--tf-${name}); }`,
        );
      }

      expect(styles).toContain(":host([as-child]) { display: contents; }");
      expect(styles).toContain(
        ":host(:not([as-child])), :host([as-child]) ::slotted(*) { display: flex; }",
      );
      expect(styles).toContain(
        ":host([inline]:not([as-child])), :host([as-child][inline]) ::slotted(*) { display: inline-flex; }",
      );
    });

    it("removes CSS variables when attributes are removed", () => {
      const container = element("flex-container");
      const attributes = [
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

      for (const name of attributes) {
        container.setAttribute(name, "value");
        container.removeAttribute(name);
        expect(container.style.getPropertyValue(`--tf-${name}`)).toBe("");
      }
    });

    it("updates the CSS variable when an attribute value changes", () => {
      const container = element("flex-container");
      const values = {
        direction: ["row", "column"],
        "align-items": ["stretch", "center"],
        "align-content": ["stretch", "space-between"],
        "justify-content": ["flex-start", "center"],
        wrap: ["nowrap", "wrap"],
        flow: ["row nowrap", "column wrap"],
        gap: ["1rem", "2rem"],
        "row-gap": ["1rem", "2rem"],
        "column-gap": ["1rem", "2rem"],
      };

      for (const [name, [initial, updated]] of Object.entries(values)) {
        container.setAttribute(name, initial);
        expect(container.style.getPropertyValue(`--tf-${name}`)).toBe(initial);

        container.setAttribute(name, updated);
        expect(container.style.getPropertyValue(`--tf-${name}`)).toBe(updated);
      }
    });
  });

  describe("flex-item", () => {
    it("assigns a slotted element and exposes its as-child styles", () => {
      const item = element("flex-item");
      const slotted = document.createElement("article");
      item.setAttribute("as-child", "");
      item.setAttribute("grow", "1");
      item.append(slotted);
      document.body.append(item);

      const slot = item.shadowRoot?.querySelector("slot");
      const styles = item.shadowRoot?.querySelector("style")?.textContent;

      expect(slot?.assignedElements()).toEqual([slotted]);
      expect(item.style.getPropertyValue("--tf-grow")).toBe("1");
      expect(styles).toContain(
        ":host([as-child][grow]) ::slotted(*) { flex-grow: var(--tf-grow); }",
      );
    });

    it("reflects all attributes to CSS variables and CSS properties", () => {
      const item = element("flex-item");
      const attributes = {
        flex: "1 1 auto",
        grow: "2",
        shrink: "0",
        basis: "10rem",
        order: "2",
        "align-self": "center",
      };

      for (const [name, value] of Object.entries(attributes)) {
        item.setAttribute(name, value);
      }

      document.body.append(item);

      for (const [name, value] of Object.entries(attributes)) {
        expect(item.style.getPropertyValue(`--tf-${name}`)).toBe(value);
      }

      const styles = item.shadowRoot?.querySelector("style")?.textContent;
      const cssProperties = {
        flex: "flex",
        grow: "flex-grow",
        shrink: "flex-shrink",
        basis: "flex-basis",
        order: "order",
        "align-self": "align-self",
      };

      for (const [name, property] of Object.entries(cssProperties)) {
        expect(styles).toContain(
          `:host([${name}]:not([as-child])), :host([as-child][${name}]) ::slotted(*) { ${property}: var(--tf-${name}); }`,
        );
      }

      expect(styles).toContain(":host([as-child]) { display: contents; }");
    });

    it("removes CSS variables when attributes are removed", () => {
      const item = element("flex-item");
      const attributes = [
        "flex",
        "grow",
        "shrink",
        "basis",
        "order",
        "align-self",
      ];

      for (const name of attributes) {
        item.setAttribute(name, "value");
        item.removeAttribute(name);
        expect(item.style.getPropertyValue(`--tf-${name}`)).toBe("");
      }
    });

    it("updates the CSS variable when an attribute value changes", () => {
      const item = element("flex-item");
      const values = {
        flex: ["1 1 auto", "2 0 10rem"],
        grow: ["1", "2"],
        shrink: ["1", "0"],
        basis: ["5rem", "10rem"],
        order: ["1", "2"],
        "align-self": ["auto", "center"],
      };

      for (const [name, [initial, updated]] of Object.entries(values)) {
        item.setAttribute(name, initial);
        expect(item.style.getPropertyValue(`--tf-${name}`)).toBe(initial);

        item.setAttribute(name, updated);
        expect(item.style.getPropertyValue(`--tf-${name}`)).toBe(updated);
      }
    });
  });
});
