export function deduplication<T, V>(arr: Array<T>, compareValue: (item: T) => V) {
  const set = new Set<V>();
  return arr.filter((item) => {
    const val = compareValue(item);
    if (set.has(val)) {
      return false;
    }
    set.add(val);
    return true;
  });
}

export function removeItem<T>(arr: Array<T>, itemToRemove: T) {
  return arr.filter((item) => !Object.is(item, itemToRemove));
}

export function addItem<T>(arr: Array<T>, newItem: T) {
  return [...arr, newItem];
}

export function replaceItem<T, V>(arr: Array<T>, compareValue: (item: T) => V, newItem: T) {
  const newItemCompareValue = compareValue(newItem);
  return arr.map((item) => {
    if (Object.is(compareValue(item), newItemCompareValue)) {
      return newItem;
    }
    return item;
  });
}

export function merge<T, V>(arrLeft: Array<T>, arrRight: Array<T>, compareValue: (item: T) => V) {
  const arrRightMap = new Map<V, T>();
  arrRight.forEach((item) => arrRightMap.set(compareValue(item), item));
  return arrLeft.map((item) => {
    const v = compareValue(item);
    const newItem = arrRightMap.get(v);
    return newItem ? newItem : item;
  });
}
