describe("item", () => {
  function getStyle(property, updateAttributes = {}) {
    return page.evaluate(
      (property, updateAttributes) => {
        const element = document.querySelector("flex-item");

        Object.keys(updateAttributes).forEach((attribute) =>
          element.setAttribute(attribute, updateAttributes[attribute])
        );

        const styles = window.getComputedStyle(element);
        return styles.getPropertyValue(property);
      },
      property,
      updateAttributes
    );
  }

  beforeAll(async () => {
    await page.goto("http://127.0.0.1:8888/test");
  });

  beforeEach(async () => {
    await page.evaluate(() => {
      const element = document.querySelector("flex-item");

      const attributeNames = element.getAttributeNames();

      attributeNames.forEach((attributeName) =>
        element.removeAttribute(attributeName)
      );
    });
  });

  it("sets flex", async () => {
    const flex = await getStyle("flex", { flex: "1 1 100px" });

    expect(flex).toBe("1 1 100px");
  });

  it("sets flex-grow", async () => {
    const flexGrow = await getStyle("flex-grow", { grow: "2" });

    expect(flexGrow).toBe("2");
  });

  it("sets flex-shrink", async () => {
    const flexShrink = await getStyle("flex-shrink", { shrink: "0" });

    expect(flexShrink).toBe("0");
  });

  it("sets flex-shrink", async () => {
    const flexShrink = await getStyle("flex-shrink", { shrink: "0" });

    expect(flexShrink).toBe("0");
  });

  it("sets flex-basis", async () => {
    const flexBasis = await getStyle("flex-basis", { basis: "200px" });

    expect(flexBasis).toBe("200px");
  });

  it("sets order", async () => {
    const order = await getStyle("order", { order: "3" });

    expect(order).toBe("3");
  });

  it("sets align-self", async () => {
    const alignSelf = await getStyle("align-self", {
      "align-self": "flex-end",
    });

    expect(alignSelf).toBe("flex-end");
  });
});
