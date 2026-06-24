import { Link } from 'react-router-dom'
import './album_category_card.css'

function CategoryCard({ artistId, albumId, albumTitle, artist, filePath }) {
    return (
        <li className="album-category-card-wrapper">
            <Link to={`/album/${albumId}`}>
                <div className="icon-wrapper">
                    <img className={"thumbnail"} src={filePath} alt="Album cover" />
                    <img className="background-thumbnail" src={filePath} alt="Album cover" />
                </div>
            </Link>
            <div className="details">
                <Link to={`/album/${albumId}`}>
                    <h2>{albumTitle}</h2>
                </Link>

                <Link to={`/profile/${artistId}`}>
                    <h3>{`By | ${artist}`}</h3>
                </Link>
            </div>

            <div className="clone-album-category-card-wrapper">
                <Link to={`/album/${albumId}`}><div className="icon-wrapper">
                    <img className="thumbnail" src={filePath} alt="Album cover" />
                    <img className="background-thumbnail" src={filePath} alt="Album cover" />
                </div></Link>
                <div className="details">
                    <Link to={`/album/${albumId}`}>
                        <h2>{albumTitle}</h2>
                    </Link>
                    <Link to={`/profile/${artistId}`}>
                        <h3>{`By | ${artist}`}</h3>
                    </Link>
                </div>
            </div>
        </li>
    )
};

export default CategoryCard
