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

describe('missing sort keys', () => {
  const items = [{ v: 3 }, { v: null }, { v: 1 }, { v: undefined }, { v: 2 }, { v: NaN }];
  const isMissing = v => v === null || v === undefined || Number.isNaN(v);

  test('orderBy puts null, undefined and NaN first and sorts the rest', () => {
    const keys = items.orderBy(x => x.v).map(x => x.v);
    expect(keys.slice(0, 3).every(isMissing)).toBe(true);
    expect(keys.slice(3)).toEqual([1, 2, 3]);
  });

  test('orderByDesc puts null, undefined and NaN last', () => {
    const keys = items.orderByDesc(x => x.v).map(x => x.v);
    expect(keys.slice(0, 3)).toEqual([3, 2, 1]);
    expect(keys.slice(3).every(isMissing)).toBe(true);
    const keys2 = [1, 2, undefined, null, 3].map(v => ({ v })).orderByDesc(x => x.v).map(x => x.v);
    expect(keys2.slice(0, 3)).toEqual([3, 2, 1]);
    expect(keys2.slice(3).every(isMissing)).toBe(true);
  });

  test('thenBy breaks ties between missing keys', () => {
    const rows = [{ a: null, b: 2 }, { a: 1, b: 0 }, { a: undefined, b: 1 }];
    expect(rows.orderBy(x => x.a).thenBy(x => x.b).map(x => x.b)).toEqual([1, 2, 0]);
  });

  test('the ES module build sorts missing keys the same way', () => {
    const { spawnSync } = require('child_process');
    const path = require('path');
    const r = spawnSync(process.execPath, ['--input-type=module', '-e',
      "await import('./index.mjs'); console.log(JSON.stringify([3, null, 1, undefined, 2].map(v => ({ v })).orderBy(x => x.v).map(x => x.v)));"],
      { cwd: path.join(__dirname, '..'), encoding: 'utf8' });
    expect(r.stderr).toBe('');
    expect(r.stdout.trim()).toBe('[null,null,1,2,3]');
  });
});
