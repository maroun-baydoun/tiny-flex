# tiny-flex

Flexbox layout for the modern web, exposed as two tiny custom elements:
`flex-container` and `flex-item`.

## Workspace

- `packages/tiny-flex` — publishable Vite-built TypeScript library
- `packages/test` — Vitest DOM tests
- `apps/demo` — Vite + Tailwind demo

## Development

```sh
pnpm install
pnpm test
pnpm --filter @tiny-flex/demo dev
```

```html
<flex-container gap="1rem" justify-content="space-between">
  <flex-item grow="1">Hello</flex-item>
  <flex-item>world</flex-item>
</flex-container>
```

See the [package README](packages/tiny-flex/README.md) for the full attribute list and release commands.

## License

MIT Copyright [Maroun Baydoun](https://maroun-baydoun.com/).
