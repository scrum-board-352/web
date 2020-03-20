export default function sleep(t: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, t);
  });
}
