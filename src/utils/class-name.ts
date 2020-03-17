export default function className(...name: string[]) {
  return name.filter(Boolean).join(" ");
}
