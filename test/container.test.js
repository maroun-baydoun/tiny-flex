describe("container", () => {
  function getStyle(property, updateAttributes = {}) {
    return page.evaluate(
      (property, updateAttributes) => {
        const element = document.querySelector("flex-container");

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
      const element = document.querySelector("flex-container");

      const attributeNames = element.getAttributeNames();

      attributeNames.forEach((attributeName) =>
        element.removeAttribute(attributeName)
      );
    });
  });

  it("sets display to flex", async () => {
    const display = await getStyle("display");

    expect(display).toBe("flex");
  });

  it("sets display to inline-flex", async () => {
    const display = await getStyle("display", { inline: "" });

    expect(display).toBe("inline-flex");
  });

  it("sets flex-direction", async () => {
    const flexDirection = await getStyle("flex-direction", {
      direction: "column",
    });

    expect(flexDirection).toBe("column");
  });

  it("sets align-items", async () => {
    const alignItems = await getStyle("align-items", {
      "align-items": "center",
    });

    expect(alignItems).toBe("center");
  });

  it("sets justify-content", async () => {
    const justifyContent = await getStyle("justify-content", {
      "justify-content": "center",
    });

    expect(justifyContent).toBe("center");
  });

  it("sets flex-wrap", async () => {
    const flexWrap = await getStyle("flex-wrap", {
      wrap: "wrap",
    });

    expect(flexWrap).toBe("wrap");
  });

  it("sets flex-flow", async () => {
    const flexFlow = await getStyle("flex-flow", {
      flow: "column wrap",
    });

    expect(flexFlow).toBe("column wrap");
  });

  it("sets gap", async () => {
    const gap = await getStyle("gap", {
      gap: "10px",
    });

    expect(gap).toBe("10px");
  });

  it("sets row-gap", async () => {
    const rowGap = await getStyle("row-gap", {
      "row-gap": "10px",
    });

    expect(rowGap).toBe("10px");
  });

  it("sets column-gap", async () => {
    const columnGap = await getStyle("column-gap", {
      "column-gap": "10px",
    });

    expect(columnGap).toBe("10px");
  });
});
