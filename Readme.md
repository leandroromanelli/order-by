
# @romatech/order-by

Chainable multi-level sorting for JavaScript arrays via `array.orderBy()` and `array.thenBy()`.

Extends `Array.prototype` safely with non-enumerable properties. Fully typed, supports CommonJS and ESM.

--- 
## 🚀 Installation 
```bash
npm install @romatech/order-by
```
----------

## ✨ Features

-   🔁 Chainable sorting on multiple fields
    
-   ⬆️⬇️ Ascending and descending support
    
-   ✅ Immutable: original array is never modified
    
-   🧠 TypeScript typings included
    
-   🔄 Compatible with both CommonJS and ESM
    
-   🧪 Fully tested with Jest
    

----------

## 📦 Usage

> ✅ **Important:** You must `require` or `import` the module once to enable `Array.prototype` extensions.

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
/*
[
  { name: 'Bob', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Charlie', age: 30 }
]
*/

```

### ES Modules

```ts
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
/*
[
  { price: 100, rating: 4.5 },
  { price: 100, rating: 4.8 },
  { price: 90, rating: 4.2 }
]
*/

```

----------

## 🧠 API

#### `array.orderBy(selector)`
Sorts the array by the selector (ascending).

#### `array.orderByDesc(selector)`
Sorts the array by the selector (descending).

#### `array.thenBy(selector)`
Chains an ascending secondary sort.
#### `array.thenByDesc(selector)`

Chains a descending secondary sort.

----------

## 🧱 TypeScript Typings

```ts
type Selector<T> = (item: T) => any;

interface OrderedArray<T> extends Array<T> {
  thenBy(fn: Selector<T>): OrderedArray<T>;
  thenByDesc(fn: Selector<T>): OrderedArray<T>;
}

interface Array<T> {
  orderBy(fn: Selector<T>): OrderedArray<T>;
  orderByDesc(fn: Selector<T>): OrderedArray<T>;
}
```

Keys that are `null`, `undefined` or `NaN` are treated as equal to each other and smaller than any other key: they come first with `orderBy`/`thenBy` and last with `orderByDesc`/`thenByDesc`, as `null` does in C#. Keys of mixed types (for example numbers and strings) have no defined order.
----------

## 🧪 Tests

```bash
npm ci
npm test
```
All tests are implemented with [Jest](https://jestjs.io) and validate sorting logic and method chaining behavior.

----------

## ⚠️ Prototype Extension Notice

This library **extends `Array.prototype`** with the following methods:

-   `orderBy`
    
-   `orderByDesc`
    
-   `thenBy`
    
-   `thenByDesc`
    

All extensions are **non-enumerable**, to avoid affecting loops and JSON serialization.


----------

## 🪪 License

MIT © RomaTech/Leandro Romanelli