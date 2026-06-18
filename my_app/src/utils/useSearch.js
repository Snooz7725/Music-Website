import { useState } from 'react';
import { useDebounce } from './useDebounce';
import { useFetch } from './useFetch'

export function useDebounceSearch(urlTemplate = '/api/data?type=searchAll', delay = 500) {
    const [inputValue, setInputValue] = useState('');
    
    const debouncedValue = useDebounce(inputValue, delay);

    // Makes a search request after debouncedValue gets set and then sets results
    const trimmed = debouncedValue?.trim();
    const url = trimmed ? `${urlTemplate}&keyword=${trimmed}` : null;

    const {data, loading, error} = useFetch(url);

    return {inputValue, setInputValue, results: data ?? []};
}