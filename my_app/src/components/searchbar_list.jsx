import { Link } from 'react-router-dom'
import './searchbar_list.css'

function SearchbarList({ searchResultsData = [] }) {
    return (
        <div className="searchbar-list-wrapper">
            {searchResultsData.map(result => {
                if ('album_id' in result) {
                    return (
                        // http://localhost:5173/album/0
                        <Link to={`/album/${result.album_id}`} className="search-row three-cols" key={`song-${result.id}`}>
                            <span>SONG</span>
                            <span>{result.artist_name}</span>
                            <span>{result.title}</span>
                        </Link>
                    )
                }

                if ('name' in result) { 
                    return (
                        <Link to={`/profile/${result.id}`} className="search-row" key={`artist-${result.id}`}>
                            <span>ARTIST</span>
                            <span>{result.name}</span>
                            <span></span>
                        </Link>
                    )
                }

                return (
                    <Link to={`/album/${result.id}`} className="search-row three-cols" key={`album-${result.id}`}>
                        <span>ALBUM</span>
                        <span>{result.artist_name}</span>
                        <span>{result.title}</span>
                    </Link>
                )
            })}
        </div>
    )
}

export default SearchbarList
