import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./searchbar_list.css";

function SearchbarList({ searchResultsData = [] }) {
    const [resultsBuffer, setResultsBuffer] = useState([]);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // New results -> show immediately
        if (searchResultsData.length > 0) {
            setResultsBuffer(searchResultsData);
            setIsClosing(false);
            return;
        }

        // Results disappeared -> play closing animation
        if (resultsBuffer.length > 0) {
            setIsClosing(true);

            const t = setTimeout(() => {
                setResultsBuffer([]);
                setIsClosing(false);
            }, 300);

            return () => clearTimeout(t);
        }
    }, [searchResultsData]);

    if (resultsBuffer.length === 0 && !isClosing) {
        return null;
    }

    return (
        <div
            className={
                isClosing
                    ? "searchbar-list-wrapper closing"
                    : "searchbar-list-wrapper"
            }
        >
            {resultsBuffer.map((result) => {
                if (result.type === "songs") {
                    return (
                        <Link
                            to={`/album/${result.album_id}`}
                            className="search-row songs"
                            key={`song-${result.id}`}
                        >
                            <span>Song</span>
                            <span>{result.artist_name}</span>
                            <span>{result.title}</span>
                        </Link>
                    );
                }

                if (result.type === "artists") {
                    return (
                        <Link
                            to={`/profile/${result.artist_id}`}
                            className="search-row artists"
                            key={`artist-${result.id}`}
                        >
                            <span>Artist</span>
                            <span>{result.artist_name}</span>
                            <span></span>
                        </Link>
                    );
                }

                if (result.type === "albums") {
                    return (
                        <Link
                            to={`/album/${result.album_id}`}
                            className="search-row albums"
                            key={`album-${result.id}`}
                        >
                            <span>Album</span>
                            <span>{result.artist_name}</span>
                            <span>{result.title}</span>
                        </Link>
                    );
                }

                return null;
            })}
        </div>
    );
}

export default SearchbarList;