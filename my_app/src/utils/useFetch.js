import { useState, useEffect } from "react";

export function useFetch(url, options = {}) {
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

        const response = await fetch(url, {
          ...options, // allow custom fetch options (headers, method, etc.)
          signal: controller.signal, // attach abort signal for cancellation
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();

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
  }, [url]); 

  return {data, loading, error};
}