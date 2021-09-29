# tiny-flex

Flexbox layout for the modern web

[![npm version](https://badge.fury.io/js/tiny-flex.svg)](https://badge.fury.io/js/tiny-flex)

## Installation

### Via npm

```sh
npm i tiny-flex
```

or

```sh
yarn add tiny-flex
```

```js
// Import all the components
import "tiny-flex";

// Import the container component only
import "tiny-flex/components/container";
```

The code shipped in the package is ES2015. If you are targeting [unsupported browsers](https://caniuse.com/es6), make sure you transpile it in your project.

### Via CDN

```html
<!-- Import all components -->
<script
  type="module"
  src="//unpkg.com/tiny-flex@insert-version-here/components/index.js"
></script>

<!-- Import the container component only -->
<script
  type="module"
  src="//unpkg.com/tiny-flex@insert-version-here/components/container.js"
></script>
```

## Usage

```html
<flex-container>
  <flex-item>Hello</flex-item>
  <flex-item>world</flex-item>
</flex-container>
```

`flex-container` accepts the following optional attributes:

- direction
- align-items
- justify-content
- align-content
- wrap
- flow
- gap
- row-gap
- column-gap

`flex-item` accepts the following optional attributes:

- flex
- grow
- shrink
- basis
- order
- align-self

## Demo 

See it running in action in this [demo](https://dev.maroun-baydoun.com/tiny-flex/#demo).

## License

MIT Copyright [Maroun Baydoun](https://maroun-baydoun.com/).
