export const snippets = {
  "install-npm": "npm install tiny-flex",
  "install-pnpm": "pnpm add tiny-flex",
  "install-yarn": "yarn add tiny-flex",
  "esm-import": `import "tiny-flex";

// The custom elements are now available in your app.`,
  "esm-script": `<script type="module" src="https://unpkg.com/tiny-flex"></script>

<!-- The custom elements are now available in your page. -->`,
  tinyflex: `<script type="module" src="https://unpkg.com/tiny-flex"></script>

<flex-container align-items="center" justify-content="space-around" gap="1rem" wrap="wrap">
  <flex-item>One</flex-item>
  <flex-item>Two</flex-item>
</flex-container>`,
  "row-layout": `<flex-container gap="1rem" wrap="wrap">
  <flex-item grow="1">One</flex-item>
  <flex-item grow="2">Two</flex-item>
  <flex-item grow="1">Three</flex-item>
</flex-container>`,
  "column-layout": `<flex-container direction="column" align-items="center" gap="0.75rem">
  <flex-item basis="4rem">Top</flex-item>
  <flex-item basis="4rem">Middle</flex-item>
  <flex-item basis="4rem">Bottom</flex-item>
</flex-container>`,
  alignment: `<flex-container align-items="center" justify-content="space-between" gap="1rem">
  <flex-item basis="4rem">Start</flex-item>
  <flex-item basis="4rem">Center</flex-item>
  <flex-item basis="4rem">End</flex-item>
</flex-container>`,
} as const;
