require('../index'); // Importa extensões

describe('@romatech/array-functions', () => {
  const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 30 },
    { name: 'Bob', age: 25 }
  ];

  test('orderBy + thenBy', () => {
    const sorted = data.orderBy(x => x.age).thenBy(x => x.name);
    expect(sorted.map(x => x.name)).toEqual(['Bob', 'Bob', 'Alice', 'Charlie']);
  });

  test('orderByDesc + thenByDesc', () => {
    const sorted = data.orderByDesc(x => x.age).thenByDesc(x => x.name);
    expect(sorted.map(x => x.name)).toEqual(['Charlie', 'Alice', 'Bob', 'Bob']);
  });

  test('distinct', () => {
    const distinct = data.distinct();
    expect(distinct.length).toBe(3);
  });

  test('distinctBy (by name)', () => {
    const byName = data.distinctBy(x => x.name);
    expect(byName.map(x => x.name)).toEqual(['Alice', 'Bob', 'Charlie']);
  });
});
