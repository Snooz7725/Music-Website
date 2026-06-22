import { useState, useEffect } from "react";

export function useLoadFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create an AbortController so we can cancel the request if needed
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, {
          ...options, // allow custom fetch options (headers, method, etc.)
          signal: controller.signal, // attach abort signal for cancellation
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const result = await res?.json();

        // Save the data into state
        setData(result);
      } catch (err) {
        // Ignore abort errors (they happen when cleanup occurs - url var 
        // changes or react unmount)
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchData();

    // cancels the fetch request
    return () => controller.abort(); 
  }, [url, options]); 

  return {data, loading, error};
}