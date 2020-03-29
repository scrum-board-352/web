import { useState } from "react";

type FilterFunc<T> = (item: T) => boolean;

export default function useFilter(): [boolean, typeof filter] {
  const [noMatched, setNoMatched] = useState(false);

  function filter<T>(data: Array<T>, filterFunc: FilterFunc<T>) {
    const filtered = data.filter(filterFunc);
    if (filtered.length) {
      setNoMatched(false);
    } else {
      setNoMatched(true);
    }
    return filtered;
  }

  return [noMatched, filter];
}
