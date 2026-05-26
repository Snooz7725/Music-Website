import { useEffect, useState } from 'react'
import './searchbar.css'
import SearchbarList from './searchbar_list'
import LoadingCard from './loading_card'
import ErrorCard from './error_card'

function Searchbar() {
    async function handleSearch(keyword) {
        try {
            const response = await fetch(`/api/data?type=searchAll&keyword=${keyword}`, { 
                method: 'GET' 
            })

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }

            setSearchResults(await response.json())
        } catch (error) {
            console.error('Fetch failed:', error)
        }
    }

    // `inputValue` stores exactly what the user is typing right now.
    // This updates immediately on every keypress so the input feels responsive.
    const [inputValue, setInputValue] = useState('')

    // `debouncedValue` stores the delayed version of the input.
    // This is the value you would use for filtering, fetching, or searching.
    // It changes only after the user stops typing for a short time.
    const [debouncedValue, setDebouncedValue] = useState('')

    const [searchResults, setSearchResults] = useState([])

    // These useEffect events are split to differentiate 
    useEffect(() => {
        // Timer starts every time input is entered
        const timer = setTimeout(() => {
            // Save debounced value
            setDebouncedValue(inputValue)
        }, 500)

        return () => clearTimeout(timer)
    }, [inputValue]) // If this value changed, useEffect runs on next re-render

    useEffect(() => {
        const trimmedSearch = debouncedValue.trim()
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
            {'data' in searchResults && searchResults.data.length > 0 && (
                <SearchbarList searchResultsData={ searchResults.data } />
            )}
        </div>
    )
}

export default Searchbar
