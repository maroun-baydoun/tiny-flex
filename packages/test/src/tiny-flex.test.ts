import { beforeEach, describe, expect, it } from "vitest";

function element<T extends HTMLElement>(tag: string): T {
  return document.createElement(tag) as T;
}

describe("tiny-flex custom elements", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("registers both public elements", () => {
    expect(customElements.get("flex-container")).toBeDefined();
    expect(customElements.get("flex-item")).toBeDefined();
  });

  it("creates a flex container and reflects attributes to CSS variables", () => {
    const container = element("flex-container");
    container.setAttribute("direction", "column");
    container.setAttribute("gap", "1rem");
    document.body.append(container);

    expect(container.style.getPropertyValue("--tf-direction")).toBe("column");
    expect(container.style.getPropertyValue("--tf-gap")).toBe("1rem");
    expect(container.shadowRoot?.querySelector("slot")).toBeTruthy();
    expect(container.shadowRoot?.querySelector("style")?.textContent).toContain("flex-direction");
  });

  it("removes CSS variables when attributes are removed", () => {
    const item = element("flex-item");
    item.setAttribute("grow", "2");
    item.removeAttribute("grow");
    expect(item.style.getPropertyValue("--tf-grow")).toBe("");
  });
});
