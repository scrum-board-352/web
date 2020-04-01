import { differenceInDays, format, formatDistanceToNow } from "date-fns";

export function day(timestamp: string) {
  return format(new Date(Number(timestamp)), "yyyy-MM-dd");
}

export function dateDistance(timestamp: string) {
  const date = new Date(Number(timestamp));
  const distanceDays = differenceInDays(new Date(), date);
  if (distanceDays >= 1) {
    return format(date, "yyyy-MM-dd HH:mm");
  }
  return formatDistanceToNow(date, { addSuffix: true });
}
