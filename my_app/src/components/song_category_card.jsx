import { Link } from 'react-router-dom'
import './song_category_card.css'

function SongCategoryCard({ artistId, songId, albumId, albumTitle, title, artist, filePath }) {
    return (
        // TODO: ADD ROUTES
        <li className="song-category-card-wrapper">
            <Link to={`/`}><div className="icon-wrapper">
                <img src={"/assets/" + filePath} alt="Album cover" />
            </div></Link>
            <div className="details">
                <Link to={`/`}><h2>{title}</h2></Link>
                <Link to={`/album/${albumId}`}>
                    <h3>{albumTitle}</h3>
                </Link>
                <Link to={`/profile/${artistId}`}>
                    <h3>{artist}</h3>
                </Link>
            </div>
        </li>
    )
};

export default SongCategoryCard