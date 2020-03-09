import { useState } from "react";

export default function useLoading(): [boolean, typeof loadingOps] {
  const [loading, setLoading] = useState(false);

  async function loadingOps<T>(f: Function, ...args: any[]): Promise<T> {
    setLoading(true);
    const res: T = await f(...args);
    setLoading(false);
    return res;
  }

  return [loading, loadingOps];
}
