import { Link } from 'react-router-dom'
import './song_category_card.css'

function SongCategoryCard({ artistId, songId, albumId, albumTitle, title, artist, filePath }) {
    return (
        // TODO: ADD ROUTES
        <li className="song-category-card-wrapper">
            <Link to={`/`}>
                <div className="icon-wrapper">
                    <img className="thumbnail" src={'/assets/' + filePath} alt="Album cover" />
                    <img className="background-thumbnail" src={'/assets/' + filePath} alt="Album cover" />
                </div>
            </Link>
            <div className="details">
                <Link to={`/`}><h2>{title}</h2></Link>
                
                <Link to={`/album/${albumId}`}>
                    <h3>{`From | ${albumTitle}`}</h3>
                </Link>

                <Link to={`/profile/${artistId}`}>
                    <h3>{`By | ${artist}`}</h3>
                </Link>
            </div>

            <div className="clone-song-category-card-wrapper">
                <Link to={`/`}>
                    <div className="icon-wrapper">
                        <img className="thumbnail" src={'/assets/' + filePath} alt="Album cover" />
                        <img className="background-thumbnail" src={'/assets/' + filePath} alt="Album cover" />
                    </div>
                </Link>
                <div className="details">
                    <Link to={`/`}><h2>{title}</h2></Link>
                    
                    <Link to={`/album/${albumId}`}>
                        <h3>{`From | ${albumTitle}`}</h3>
                    </Link>

                    <Link to={`/profile/${artistId}`}>
                        <h3>{`By | ${artist}`}</h3>
                    </Link>
                </div>
            </div>
        </li>
    )
};

export default SongCategoryCard