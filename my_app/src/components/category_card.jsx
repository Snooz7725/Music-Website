import { Link } from 'react-router-dom'
import './category_card.css'

function CategoryCard({ id, title, artist, filePath }) {
    return (
        <li className="category-card-wrapper">
            <Link to={`/album/${id}`}><div className="icon-wrapper">
                <img src={"/assets/" + filePath} alt="Album cover" />
            </div></Link>
            <div className="details">
                <Link to={`/album/${id}`}>
                    <h2>{title}</h2>
                </Link>
                <h3>{artist}</h3>
            </div>
        </li>
    )
};

export default CategoryCard