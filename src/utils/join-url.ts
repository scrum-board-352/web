function endWithSlash(str: string) {
  return str[str.length - 1] === "/";
}

export default function joinUrl(url: string, ...entrys: string[]) {
  const entry = entrys.join("/");
  if (!entry) {
    return url;
  }
  if (endWithSlash(url)) {
    return url + entry;
  }
  return url + "/" + entry;
}
