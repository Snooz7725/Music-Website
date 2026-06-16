import './searchbar.css'
import { useEffect, useState } from 'react'
import SearchbarList from './searchbar_list'
import LoadingCard from './loading_card'
import ErrorCard from './error_card'

function Searchbar() {
    async function handleSearch(keyword) {
        // The try-except + error raising method: this makes the custom message come up as an error in console
        // By default, this catches network errors
        try {
            const res = await fetch(`/api/data?type=searchAll&keyword=${keyword}`, { 
                method: 'GET' 
            })

            // Catches HTTP errors
            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)

            setSearchResults(await res.json())
        } catch (error) {console.error('Fetch failed:', error)}
    }

    // `inputValue` stores exactly what the user is typing right now.
    // This updates immediately on every keypress so the input feels responsive.
    const [inputValue, setInputValue] = useState('')

    // `debouncedValue` stores the delayed version of the input.
    // This is the value you would use for filtering, fetching, or searching.
    // It changes only after the user stops typing for a short time.
    const [debouncedValue, setDebouncedValue] = useState('')

    const [searchResults, setSearchResults] = useState([])

    // These useEffect events are split to differentiate and run at different times
    useEffect(() => {
        // Timer starts every time input is entered
        const timer = setTimeout(() => {
            // Save debounced value
            setDebouncedValue(inputValue)
        }, 500)
        
        // Returning in effects only gives the effect a function for undoing the effect - this only occurs 
        // when the inputValue changes
        return () => clearTimeout(timer)
    }, [inputValue]) // If this value changed, useEffect runs on next re-render

    useEffect(() => {
        const trimmedSearch = debouncedValue?.trim()
        if (!trimmedSearch) {
            setSearchResults([])
            return
        }

        handleSearch(trimmedSearch)
    }, [debouncedValue])

    return (
        <div className="searchbar-wrapper">
            <section className="input-section">
                <label className="icon-wrapper" htmlFor="searchField">
                    <img src="/assets/search_btn.png" alt="Search" />
                </label>

                <input
                    id="searchField"
                    type="text"
                    
                    // The input's displayed value is controlled by React state.
                    // This keeps the textbox and your logic in sync.
                    value={inputValue}

                    // This keep input memory updated
                    onChange={(e) => setInputValue(e.target.value)}
                    
                    placeholder="Search songs/albums.."
                />
            </section>
            {(searchResults?.data?.length ?? 0) > 0 && (
                <SearchbarList searchResultsData={searchResults.data} />
            )}
        </div>
    )
}

export default Searchbar
