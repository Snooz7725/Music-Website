import './searchbar.css'
import { useDebSearch } from '../utils/useDebSearch'
import SearchbarList from './searchbar_list'
import LoadingCard from './loading_card'
import ErrorCard from './error_card'

function Searchbar() {
    const {inputValue, setInputValue, results} = useDebSearch()

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
            {(results?.data?.length ?? 0) > 0 && (
                <SearchbarList searchResultsData={results.data} />
            )}
        </div>
    )
}

export default Searchbar
