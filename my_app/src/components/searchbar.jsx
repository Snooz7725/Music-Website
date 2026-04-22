import { useState } from 'react'
import './searchbar.css'

function Searchbar() {
    const [state, setState] = useState(true)
  
    return (
        <div className="searchbar-wrapper">
            <label className="icon-wrapper" htmlFor="searchField">
                <img src="/assets/search_btn.png" alt="Search" />
            </label>
            <input
                id="searchField"
                type="text"                   // the displayed text = state
                onChange={(e) => setState(e.target.value)} // updates state when user types
                placeholder="Search songs/albums.."
            />
        </div>
    )
  }
  
  export default Searchbar