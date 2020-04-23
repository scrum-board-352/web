export function hasOwnKey(o: object, key: string) {
  return Object.prototype.hasOwnProperty.call(o, key);
}

export function copyObject(o: object, filter?: (val: any) => any) {
  const res = {};
  for (const [k, v] of Object.entries(o)) {
    const newValue = filter ? filter(v) : v;
    Reflect.set(res, k, newValue);
  }
  return res;
}
