import { Link } from 'react-router-dom'
import './searchbar_list.css'

function SearchbarList({ searchResultsData = [] }) {
    return (
        <div className="searchbar-list-wrapper">
            {searchResultsData.map(result => {
                if (result.type === 'songs') {
                    return (
                        <Link to={`/album/${result.album_id}`} className="search-row" key={`song-${result.id}`}>
                            <span>Song</span>
                            <span>{result.artist_name}</span>
                            <span>{result.title}</span>
                        </Link>
                    )
                }

                if (result.type === 'artists') { 
                    return (
                        <Link to={`/profile/${result.id}`} className="search-row" key={`artist-${result.id}`}>
                            <span>Artist</span>
                            <span>{result.artist_name}</span>
                            <span></span>
                        </Link>
                    )
                }

                if (result.type === 'albums') {
                    return (
                        <Link to={`/album/${result.id}`} className="search-row" key={`album-${result.id}`}>
                            <span>Album</span>
                            <span>{result.artist_name}</span>
                            <span>{result.title}</span>
                        </Link>
                    )
                }
            })}
        </div>
    )
}

export default SearchbarList
