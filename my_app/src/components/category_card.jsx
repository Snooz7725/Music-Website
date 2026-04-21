import { useState } from 'react'
import { Link } from 'react-router-dom'
import './category_card.css'

function CategoryCard({ title, artist, filePath }) {
    const [state, setState] = useState(true)

    return (
        <li className="category-card-wrapper">
            <div className="icon-wrapper">
                <img src={filePath} alt="Album cover" />
            </div>
            <div>
                <h2>{title}</h2>
                <h3>{artist}</h3>
            </div>
        </li>
    )
};

export default CategoryCard