import { useEffect, useState } from 'react'
import './searchbar.css'

function Searchbar() {
    async function handleSearch(keyword) {
        try {
            const response = await fetch(`/api/data?type=searchAll?keyword=${keyword}`, { 
                method: "GET" 
            })

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }

            const searches = await response.json()
        } catch (error) {
            console.error("Fetch failed:", error)
            errorFlag = true
        } finally {
            if (errorFlag) {
                setLoadStatus("errored")
            } else setLoadStatus("loaded")
            
        }
    }

    const [loadStatus, setLoadStatus] = useState("loading")
    let errorFlag = false

    // `inputValue` stores exactly what the user is typing right now.
    // This updates immediately on every keypress so the input feels responsive.
    const [inputValue, setInputValue] = useState('')

    // `debouncedValue` stores the delayed version of the input.
    // This is the value you would use for filtering, fetching, or searching.
    // It changes only after the user stops typing for a short time.
    const [debouncedValue, setDebouncedValue] = useState('')

    useEffect(() => {
        // Timer starts every time input is entered
        const timer = setTimeout(() => {
            // Save debounced value
            setDebouncedValue(inputValue)
        }, 500)

        return () => clearTimeout(timer)
    }, [inputValue])

    useEffect(() => {
        console.log('Search using:', debouncedValue)
        handleSearch
    }, [debouncedValue])

    return (
        <div className="searchbar-wrapper">
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
        </div>
    )
}

export default Searchbar
