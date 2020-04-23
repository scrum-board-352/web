export function hasOwnKey(o: object, key: string) {
  return Object.prototype.hasOwnProperty.call(o, key);
}
