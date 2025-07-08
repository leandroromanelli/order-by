function compare(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function chainSort(array, selectors, directions) {
  const sorted = [...array].sort((a, b) => {
    for (let i = 0; i < selectors.length; i++) {
      const result = directions[i]
        ? compare(selectors[i](b), selectors[i](a))
        : compare(selectors[i](a), selectors[i](b));
      if (result !== 0) return result;
    }
    return 0;
  });

  return addChainMethods(sorted, selectors, directions);
}

function addChainMethods(array, selectors, directions) {
  Object.defineProperty(array, 'thenBy', {
    enumerable: false,
    value: function (fn) {
      return chainSort(this, [...selectors, fn], [...directions, false]);
    },
  });

  Object.defineProperty(array, 'thenByDesc', {
    enumerable: false,
    value: function (fn) {
      return chainSort(this, [...selectors, fn], [...directions, true]);
    },
  });

  return array;
}

Object.defineProperty(Array.prototype, 'orderBy', {
  enumerable: false,
  value: function (fn) {
    return chainSort(this, [fn], [false]);
  },
});

Object.defineProperty(Array.prototype, 'orderByDesc', {
  enumerable: false,
  value: function (fn) {
    return chainSort(this, [fn], [true]);
  },
});

Object.defineProperty(Array.prototype, 'distinct', {
  enumerable: false,
  value: function () {
    const seen = new Set();
    return this.filter(item => {
      const key = JSON.stringify(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  },
});

Object.defineProperty(Array.prototype, 'distinctBy', {
  enumerable: false,
  value: function (fn) {
    const seen = new Set();
    return this.filter(item => {
      const key = fn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  },
});

export default {};