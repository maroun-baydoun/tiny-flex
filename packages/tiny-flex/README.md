# tiny-flex

Flexbox layout for the modern web.

tiny-flex is a small web components library for building Flexbox layouts with
`<flex-container>` and `<flex-item>`.

## Installation

### npm

```sh
npm install tiny-flex
```

Then import the package from your application code:

```js
import "tiny-flex";
```

tiny-flex is an ES module. Importing it registers the `flex-container` and
`flex-item` custom elements.

### CDN

Load the ES module directly in a browser page:

```html
<script type="module" src="https://unpkg.com/tiny-flex"></script>
```

## Usage

### Row layout

The default direction is a row. Use `grow` to distribute available space
between items.

```html
<flex-container gap="1rem" wrap="wrap">
  <flex-item grow="1">One</flex-item>
  <flex-item grow="2">Two</flex-item>
  <flex-item grow="1">Three</flex-item>
</flex-container>
```

### Column layout

Set `direction="column"` to stack items and use `align-items` to position them
across the cross axis. `basis` sets each item’s initial size.

```html
<flex-container direction="column" align-items="center" gap="0.75rem">
  <flex-item basis="4rem">Top</flex-item>
  <flex-item basis="4rem">Middle</flex-item>
  <flex-item basis="4rem">Bottom</flex-item>
</flex-container>
```

### Alignment

Use `justify-content` to distribute items along the main axis.

```html
<flex-container
  align-items="center"
  justify-content="space-between"
  gap="1rem"
>
  <flex-item basis="4rem">Start</flex-item>
  <flex-item basis="4rem">Center</flex-item>
  <flex-item basis="4rem">End</flex-item>
</flex-container>
```

## API

### `flex-container`

`flex-container` is a flex container. Its attributes map to the corresponding
CSS Flexbox properties.

| Attribute | CSS property | Description |
| --- | --- | --- |
| `inline` | `display` | Uses `inline-flex` instead of `flex`. |
| `direction` | `flex-direction` | Sets the main axis, such as `row` or `column`. |
| `align-items` | `align-items` | Aligns items across the cross axis. |
| `align-content` | `align-content` | Aligns wrapped lines across the cross axis. |
| `justify-content` | `justify-content` | Distributes items along the main axis. |
| `wrap` | `flex-wrap` | Controls whether items wrap onto multiple lines. |
| `flow` | `flex-flow` | Sets `flex-direction` and `flex-wrap` together. |
| `gap` | `gap` | Sets the space between items. |
| `row-gap` | `row-gap` | Sets the space between rows. |
| `column-gap` | `column-gap` | Sets the space between columns. |

### `flex-item`

`flex-item` is a flex item. Its attributes control how it participates in its
parent container.

| Attribute | CSS property | Description |
| --- | --- | --- |
| `flex` | `flex` | Sets the grow, shrink, and basis shorthand. |
| `grow` | `flex-grow` | Controls how much available space the item can receive. |
| `shrink` | `flex-shrink` | Controls how much the item can shrink. |
| `basis` | `flex-basis` | Sets the item’s initial size. |
| `order` | `order` | Changes the item’s visual order. |
| `align-self` | `align-self` | Overrides the container’s alignment for this item. |

## Demo

See tiny-flex in action in the [demo](https://dev.maroun-baydoun.com/tiny-flex/).

## License

MIT Copyright [Maroun Baydoun](https://maroun-baydoun.com/).
