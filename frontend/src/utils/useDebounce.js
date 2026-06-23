import { useEffect, useState } from 'react';

// Designed to constantly get called to reset the timer until user stops 
// typing to finally set debouncedValue, and thus make the search request
export function useDebounce(inputValue, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => clearTimeout(timer);
    }, [inputValue, delay]);

    return debouncedValue;
}