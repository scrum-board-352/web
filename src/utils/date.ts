import { format } from "date-fns";

export function day(timestamp: string) {
  return format(new Date(Number(timestamp)), "yyyy-MM-dd");
}

export function dateDistance(timestamp: string) {}
