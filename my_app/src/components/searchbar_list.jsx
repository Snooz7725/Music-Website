import { Link } from 'react-router-dom'
import './searchbar_list.css'

function SearchbarList( searchResults ) {
    return (
        <div className="searchbar-list-wrapper">
            {searchResults.map(result => (
                "album_id" in result ? (
                    <Link to={`/album/${result.album_id}`} className="search-row">
                        <span>{result.title}</span>
                    </Link>
                ) : "name" in result ? (
                    <Link to={`/profile/${result.id}`} className="search-row">
                        <span>{result.name}</span>
                    </Link>
                ) : (
                    <Link to={`/album/${result.id}`} className="search-row">
                        <span>{result.title}</span>
                    </Link>
                )
            ))}
        </div>
    )
}

export default SearchbarList