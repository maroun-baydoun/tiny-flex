const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const wrap = (kind: string, value: string) =>
  `<span class="token-${kind}">${escapeHtml(value)}</span>`;
const keywords = new Set([
  "import",
  "from",
  "const",
  "let",
  "var",
  "function",
  "return",
]);

const renderHtml = (source: string) =>
  source
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part.startsWith("<")) return escapeHtml(part);
      const tag = escapeHtml(part)
        .replace(/(&lt;\/?)([\w-]+)/, '$1<span class="token-keyword">$2</span>')
        .replace(
          /([\w-]+)(=)(\&quot;[^\&quot;]*\&quot;)/g,
          '<span class="token-identifier">$1</span><span class="token-operator">$2</span><span class="token-string">$3</span>',
        );
      return tag;
    })
    .join("");

export function renderHighlightedCode(
  source: string,
  language: "typescript" | "shell" | "html",
) {
  if (language === "html") return renderHtml(source);
  if (language === "shell")
    return source
      .split(/(\s+)/)
      .map((part) =>
        /^\s+$/.test(part)
          ? escapeHtml(part)
          : wrap(
              ["npm", "pnpm", "yarn", "install", "add"].includes(part)
                ? "keyword"
                : "identifier",
              part,
            ),
      )
      .join("");
  return source
    .split(/(\s+|[{}()[\],;.=])/)
    .map((part) => {
      if (!part) return "";
      if (/^\s+$/.test(part)) return escapeHtml(part);
      if (/^["'`].*["'`]$/.test(part)) return wrap("string", part);
      if (keywords.has(part)) return wrap("keyword", part);
      if (/^[{}()[\],;.=]$/.test(part)) return wrap("punctuation", part);
      return escapeHtml(part);
    })
    .join("");
}
