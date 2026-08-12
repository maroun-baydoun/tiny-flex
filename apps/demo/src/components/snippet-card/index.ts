import "./style.css";
import type { SnippetCopyButton } from "../snippet-copy-button";

export class SnippetCard extends HTMLElement {
  #wired = false;

  connectedCallback() {
    if (this.#wired) return;

    const code = this.querySelector<HTMLElement>("code[data-code]");
    const copy = this.querySelector<SnippetCopyButton>("snippet-copy-button");
    if (!code) return;
    const source = code.textContent ?? "";
    this.toggleAttribute("inline", !source.includes("\n"));
    const title = this.querySelector<HTMLElement>("[data-snippet-title]");
    const language = this.querySelector<HTMLElement>("[data-snippet-language]");

    if (title) {
      title.hidden = !this.hasAttribute("title");
      title.textContent = this.getAttribute("title") ?? "";
    }
    if (language) {
      language.hidden = !this.hasAttribute("language-label");
      language.textContent = this.getAttribute("language-label") ?? "";
    }
    if (copy) {
      copy.clipboardText = source;
      copy.dataset.position = "bottom-right";
    }

    this.#wired = true;
  }
}

if (!customElements.get("snippet-card"))
  customElements.define("snippet-card", SnippetCard);
