require('../index'); // This loads the Array.prototype extensions

const data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 },
];

describe('Array.prototype.orderBy-chain', () => {
  test('orderBy then thenBy', () => {
    const sorted = data.orderBy(x => x.age).thenBy(x => x.name);
    expect(JSON.parse(JSON.stringify(sorted))).toEqual([
      { name: 'Bob', age: 25 },
      { name: 'Alice', age: 30 },
      { name: 'Charlie', age: 30 },
    ]);
  });

  test('orderByDesc then thenByDesc', () => {
    const sorted = data.orderByDesc(x => x.age).thenByDesc(x => x.name);
    expect(JSON.parse(JSON.stringify(sorted))).toEqual([
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ]);
  });

  test('throws error if accessing thenBy from plain array', () => {
    const plain = [...data];
    expect(() => plain.thenBy(x => x.name)).toThrow();
  });
});
