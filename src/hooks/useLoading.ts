import { useCallback, useState } from "react";

type AwaitReturnType<T> = T extends (...args: any[]) => Promise<infer V> ? V : T;

type OpFunc = (...args: any[]) => any;

export default function useLoading(): [boolean, typeof loadingOps] {
  const [loading, setLoading] = useState(false);
  const loadingOps = useCallback(
    async <T extends OpFunc>(f: T, ...args: Parameters<T>): Promise<AwaitReturnType<T>> => {
      setLoading(true);
      try {
        return await f(...args);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return [loading, loadingOps];
}
