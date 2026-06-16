import { useState, useEffect } from "react";

export function useFetch(url, options = {}) {
  // Stores the fetched data (starts as null before anything loads)
  const [data, setData] = useState(null);

  // Tracks whether the request is still loading
  const [loading, setLoading] = useState(true);

  // Stores any error that happens during fetch
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create an AbortController so we can cancel the request if needed
    const controller = new AbortController();

    // Async function that actually performs the fetch request
    async function fetchData() {
      try {
        // Start loading and reset any previous error
        setLoading(true);
        setError(null);

        // Make the API request using fetch
        const response = await fetch(url, {
          ...options, // allow custom fetch options (headers, method, etc.)
          signal: controller.signal, // attach abort signal for cancellation
        });

        // If response is not OK (like 404 or 500), throw an error
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        // Convert response body into JSON
        const result = await response.json();

        // Save the data into state
        setData(result);
      } catch (err) {
        // Ignore abort errors (they happen when component unmounts)
        if (err.name !== "AbortError") {
          setError(err); // store any real error
        }
      } finally {
        // Always stop loading, whether success or error
        setLoading(false);
      }
    }

    // Run the fetch function
    fetchData();

    // Cleanup function runs when component unmounts or url changes
    return () => controller.abort(); // cancels the fetch request
  }, [url]); 
  // 👆 effect re-runs whenever the URL changes

  // Return values so components can use them
  return { data, loading, error };
}