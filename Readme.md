# @romatech/order-by

🧠 A lightweight utility that extends `Array.prototype` with:

- ✅ `orderBy` / `orderByDesc`
- ✅ `thenBy` / `thenByDesc`
- ✅ `distinct` / `distinctBy`

Chainable, immutable, fully typed, and compatible with CommonJS and ES Modules.
>🧩 This package adds safe, non-enumerable methods to `Array.prototype`.

## 🚀 Installation

```bash
npm install @romatech/order-by
```

## 📦 Usage

> ✅ You must import the package once to enable prototype extensions.

### CommonJS  
```js
require('@romatech/order-by');

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 },
];

const sorted = users
  .orderBy(u => u.age)
  .thenBy(u => u.name);

console.log(sorted);
```

### ES Modules
```js
import '@romatech/order-by';

const products = [
  { price: 100, rating: 4.5 },
  { price: 100, rating: 4.8 },
  { price: 90, rating: 4.2 },
];

const sorted = products
  .orderByDesc(p => p.price)
  .thenBy(p => p.rating);

console.log(sorted);
```

## 🧠 API
### Sorting
`array.orderBy(fn)`
Sort ascending by selector

`array.orderByDesc(fn)`
Sort descending by selector

`array.thenBy(fn)`
Chain secondary ascending sort

`array.thenByDesc(fn)`
Chain secondary descending sort

```js
const arr = [
  { name: 'A', age: 25 },
  { name: 'B', age: 30 },
  { name: 'C', age: 30 },
];

const sorted = arr
  .orderBy(x => x.age)
  .thenBy(x => x.name);

```
### Uniqueness

`array.distinct()`
Removes deep-equal duplicates (via `JSON.stringify`)

`array.distinctBy(fn)`
Removes duplicates based on selector return value

```js
const arr = [
  { id: 1, name: 'A' },
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
];

arr.distinct();
// → [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]

arr.distinctBy(x => x.id);
// → [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]

```

## 🧱 TypeScript Support

Includes full typings via `index.d.ts`.
```ts
type Selector<T> = (item: T) => any;

interface OrderedArray<T> extends Array<T> {
  thenBy(fn: Selector<T>): OrderedArray<T>;
  thenByDesc(fn: Selector<T>): OrderedArray<T>;
}

interface Array<T> {
  orderBy(fn: Selector<T>): OrderedArray<T>;
  orderByDesc(fn: Selector<T>): OrderedArray<T>;
  distinct(): T[];
  distinctBy(fn: Selector<T>): T[];
}
```
## ✅ Compatibility

-   Node.js LTS (≥ v18)
    
-   Works in browsers (via bundlers like Vite/Webpack)
    
-   Fully compatible with CommonJS and ESM

## 🧪 Tests

```bash
npm  install
npm  test
```

All tests are implemented with [Jest](https://jestjs.io) and validate sorting logic and method chaining behavior.

## ⚠️ Prototype Extension Warning

This package **extends `Array.prototype`** with non-enumerable methods:
-   `orderBy`, `orderByDesc`

-   `thenBy`, `thenByDesc`  

-   `distinct`, `distinctBy`
> ✅ Safe in most applications.  
> ❌ Avoid in libraries where global prototype changes are discouraged.
## 🪪 License
MIT © RomaTech/Leandro Romanelli