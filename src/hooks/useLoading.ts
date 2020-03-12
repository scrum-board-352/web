import { useState } from "react";

type AwaitReturnType<T> = T extends (...args: any[]) => Promise<infer V>
  ? V
  : T;

type OpFunc = (...args: any[]) => any;

export default function useLoading(): [boolean, typeof loadingOps] {
  const [loading, setLoading] = useState(false);

  async function loadingOps<T extends OpFunc>(
    f: T,
    ...args: Parameters<T>
  ): Promise<AwaitReturnType<T>> {
    setLoading(true);
    try {
      return await f(...args);
    } finally {
      setLoading(false);
    }
  }

  return [loading, loadingOps];
}
