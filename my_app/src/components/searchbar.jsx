import { useState } from 'react'
import './searchbar.css'
import searchIcon from "./../assets/search.png"

function Searchbar() {
    const [state, setState] = useState(true)
  
    return (
        <div className="searchbar-wrapper">
            <label className="icon-wrapper" for="searchField">
                <img src={searchIcon} />
            </label>
            <input
                id="searchField"
                type="text"                   // the displayed text = state
                onChange={(e) => setState(e.target.value)} // updates state when user types
                placeholder="Search Songs/Albums.."
            />
        </div>
    )
  }
  
  export default Searchbar