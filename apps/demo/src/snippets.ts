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
  "as-child": `<flex-container align-items="center" gap="1rem">
  <flex-item as-child basis="2.5rem">
    <span aria-hidden="true">!</span>
  </flex-item>
  <flex-item as-child grow="1" basis="12rem">
    <div>
      <strong>Changes saved</strong>
      <span>Your workspace is up to date.</span>
    </div>
  </flex-item>
  <flex-item as-child basis="auto">
    <button type="button">Dismiss</button>
  </flex-item>
</flex-container>`,
  "diagonal-layout": `<flex-container align-items="flex-start" gap="1rem">
  <flex-item basis="5rem">One</flex-item>
  <flex-item basis="5rem" align-self="center">Two</flex-item>
  <flex-item basis="5rem" align-self="flex-end">Three</flex-item>
</flex-container>`,
  "wrap-layout": `<flex-container wrap="wrap" gap="1rem">
  <flex-item basis="7rem">One</flex-item>
  <flex-item basis="7rem">Two</flex-item>
  <flex-item basis="7rem">Three</flex-item>
  <flex-item basis="7rem">Four</flex-item>
  <flex-item basis="7rem">Five</flex-item>
  <flex-item basis="7rem">Six</flex-item>
</flex-container>`,
  "order-layout": `<flex-container align-items="center" justify-content="center" gap="1rem">
  <flex-item basis="5rem" order="3">One</flex-item>
  <flex-item basis="5rem" order="1">Two</flex-item>
  <flex-item basis="5rem" order="2">Three</flex-item>
</flex-container>`,
  "as-child-container": `<flex-container
  as-child
  direction="row"
  align-items="center"
  justify-content="space-between"
  gap="1rem"
>
  <nav aria-label="Account navigation">
    <strong>Workspace</strong>
    <div>
      <a href="#attributes-heading">Overview</a>
      <a href="#attributes-heading">Settings</a>
    </div>
  </nav>
</flex-container>`,
} as const;
