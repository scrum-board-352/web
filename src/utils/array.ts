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
