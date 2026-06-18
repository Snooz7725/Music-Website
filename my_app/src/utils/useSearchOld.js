import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch(delay = 500) {
    const [inputValue, setInputValue] = useState(null);
    const [results, setResults] = useState([]);
    
    const debouncedValue = useDebounce(inputValue, delay);

    // Makes a search request after debouncedValue gets set and then sets results
    useEffect(() => {
        async function featchSearchResults() {
            const trimmed = debouncedValue?.trim();

            if (!trimmed) {
                setResults([]);
                return;
            }

            try {
                const res = await fetch(
                    `/api/data?type=searchAll&keyword=${trimmed}`
                );

                if (!res.ok)
                    throw new Error(`HTTP ${res.status}`);

                setResults(await res.json());
            } catch (err) {
                console.error(err);
            }
        };

        featchSearchResults();
    }, [debouncedValue]);

    return {inputValue, setInputValue, results};
}