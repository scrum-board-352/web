function toUrlEncoded(data: object) {
  return Object.entries(data)
    .map((entry) => `${entry[0]}=${entry[1]}`)
    .join("&");
}

export async function post(url: string, data: object) {
  const res = await fetch(url, {
    method: "POST",
    body: toUrlEncoded(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return await res.json();
}
