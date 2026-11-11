// null, undefined and NaN are not ordered by < and >, which made the
// comparator inconsistent and left the result unsorted. Treat them as equal
// to each other and smaller than any other value (like null in C#).
function isMissingKey(value) {
  return value === null || value === undefined || (typeof value === 'number' && Number.isNaN(value));
}

function compare(a, b) {
  const aMissing = isMissingKey(a);
  const bMissing = isMissingKey(b);
  if (aMissing || bMissing) return aMissing === bMissing ? 0 : aMissing ? -1 : 1;
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function chainSort(array, selectors, directions) {
  const sorted = [...array].sort((a, b) => {
    for (let i = 0; i < selectors.length; i++) {
      const aVal = selectors[i](a);
      const bVal = selectors[i](b);
      const comp = directions[i]
        ? compare(bVal, aVal)
        : compare(aVal, bVal);
      if (comp !== 0) return comp;
    }
    return 0;
  });

  return addChainMethods(sorted, selectors, directions);
}

function addChainMethods(array, selectors, directions) {
  Object.defineProperty(array, 'thenBy', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (fn) {
      return chainSort(this, [...selectors, fn], [...directions, false]);
    },
  });

  Object.defineProperty(array, 'thenByDesc', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (fn) {
      return chainSort(this, [...selectors, fn], [...directions, true]);
    },
  });

  return array;
}

Object.defineProperty(Array.prototype, 'orderBy', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: function (fn) {
    return chainSort(this, [fn], [false]);
  },
});

Object.defineProperty(Array.prototype, 'orderByDesc', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: function (fn) {
    return chainSort(this, [fn], [true]);
  },
});

export default {};
