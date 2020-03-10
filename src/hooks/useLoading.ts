import { useState } from "react";

export default function useLoading(): [boolean, typeof loadingOps] {
  const [loading, setLoading] = useState(false);

  async function loadingOps<T>(f: Function, ...args: any[]): Promise<T> {
    setLoading(true);
    try {
      return await f(...args);
    } finally {
      setLoading(false);
    }
  }

  return [loading, loadingOps];
}
