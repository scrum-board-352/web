export default function className(...name: (string | undefined)[]) {
  return name.filter(Boolean).join(" ");
}
