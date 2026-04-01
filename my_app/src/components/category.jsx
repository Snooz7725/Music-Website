import { useState } from 'react'
import './category.css'

function Category({ title, children }) {
    const [state, setState] = useState(true)

    return (
        <div className="category-wrapper">
            <h1>{title}</h1>
            <ul className="card-list">{children}</ul>
        </div>
    )
};

export default Category