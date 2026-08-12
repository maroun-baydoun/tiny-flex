import "./style.css";

export class SnippetCopyButton extends HTMLElement {
  #text = "";
  #button: HTMLButtonElement | null = null;
  #label = "Copy";

  connectedCallback() {
    if (!navigator.clipboard?.writeText) {
      this.hidden = true;
      this.setAttribute("aria-hidden", "true");
      return;
    }

    if (this.#button) return;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = this.textContent?.trim() || "Copy";
    this.#label = button.textContent;
    button.addEventListener("click", async () => {
      if (!this.#text) return;
      try { await navigator.clipboard.writeText(this.#text); } catch { return; }
      button.textContent = "Copied";
      button.setAttribute("aria-label", "Snippet copied");
      window.setTimeout(() => {
        button.textContent = this.#label;
        button.removeAttribute("aria-label");
      }, 1500);
    });
    this.replaceChildren(button);
    this.#button = button;
  }

  set clipboardText(value: string) { this.#text = value; }
  get clipboardText() { return this.#text; }
}

if (!customElements.get("snippet-copy-button")) customElements.define("snippet-copy-button", SnippetCopyButton);
