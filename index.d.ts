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
