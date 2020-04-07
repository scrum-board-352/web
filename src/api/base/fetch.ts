import { getUid } from "./auth";

function toUrlEncoded(data: object) {
  return Object.entries(data)
    .map((entry) => `${entry[0]}=${entry[1]}`)
    .join("&");
}

// function toMuiltipart(data: object) {
//   const formData = new FormData();
//   Object.entries(data).forEach((entry) => formData.append(entry[0], entry[1]));
//   return formData;
// }

export async function post(url: string, data: object) {
  const res = await fetch(url, {
    method: "POST",
    body: toUrlEncoded(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + getUid(),
    },
  });
  return await res.json();
}
