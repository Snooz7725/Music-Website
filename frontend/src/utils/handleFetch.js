export async function fetchData(url, options = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}