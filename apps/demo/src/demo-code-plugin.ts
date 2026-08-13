import type { Plugin } from "vite";
import { renderHighlightedCode } from "./highlight";

type SnippetMap = Record<string, string>;

export function demoCodePlugin(snippets: SnippetMap): Plugin {
  return {
    name: "demo-code-plugin",
    transformIndexHtml(html: string) {
      return html.replace(
        /<code([^>]*data-code="([^"]+)"[^>]*)><\/code>/g,
        (_match, attrs: string, key: string) => {
          const source = snippets[key];
          if (!source) {
            return `<code${attrs}></code>`;
          }
          const language = attrs.includes('data-language="shell"')
            ? "shell"
            : attrs.includes('data-language="html"')
              ? "html"
              : "typescript";
          return `<code${attrs}>${renderHighlightedCode(source, language)}</code>`;
        },
      );
    },
  };
}
