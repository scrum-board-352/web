const mapping = new Map<Function, string>();

export function setApiMappingName(apiFunc: Function, name: string) {
  mapping.set(apiFunc, name);
}

export function getApiMappingName(apiFunc: Function) {
  const name = mapping.get(apiFunc);
  if (!name) {
    throw new Error(`no api name mapping for function '${apiFunc.name}'!`);
  }
  return name;
}
