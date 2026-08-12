import "./style.css";

export class ChipTabs extends HTMLElement {
  connectedCallback() {
    const buttons = [...this.querySelectorAll<HTMLButtonElement>("[data-tab]")];
    const panels = [...this.querySelectorAll<HTMLElement>("[data-tab-panel]")];
    if (!buttons.length || !panels.length) return;
    const activate = (tab: string) => {
      buttons.forEach((button) => {
        const active = button.dataset.tab === tab;
        button.setAttribute("aria-selected", String(active));
        button.tabIndex = active ? 0 : -1;
        if (button.dataset.tab) {
          button.id = `${this.id || "chip-tabs"}-tab-${button.dataset.tab}`;
          button.setAttribute(
            "aria-controls",
            `${this.id || "chip-tabs"}-${button.dataset.tab}`,
          );
        }
      });
      panels.forEach((panel) => {
        const active = panel.dataset.tabPanel === tab;
        panel.dataset.active = String(active);
        panel.hidden = !active;
        if (panel.dataset.tabPanel) {
          panel.id = `${this.id || "chip-tabs"}-${panel.dataset.tabPanel}`;
          panel.setAttribute(
            "aria-labelledby",
            `${this.id || "chip-tabs"}-tab-${panel.dataset.tabPanel}`,
          );
          panel.setAttribute("role", "tabpanel");
        }
      });
    };
    this.querySelector("[data-tablist]")?.setAttribute("role", "tablist");
    buttons.forEach((button, index) => {
      button.setAttribute("role", "tab");
      button.addEventListener("click", () =>
        activate(button.dataset.tab ?? ""),
      );
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
          return;
        event.preventDefault();
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? buttons.length - 1
              : (index +
                  (event.key === "ArrowRight" ? 1 : -1) +
                  buttons.length) %
                buttons.length;
        buttons[next].focus();
        activate(buttons[next].dataset.tab ?? "");
      });
    });
    activate(this.dataset.defaultTab ?? buttons[0].dataset.tab ?? "");
  }
}

if (!customElements.get("chip-tabs"))
  customElements.define("chip-tabs", ChipTabs);
