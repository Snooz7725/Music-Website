import { useState } from "react"
import "./like_btn.css"

function LikeBtn() {
    const [liked, setLiked] = useState(false)

    return (
        <li><button>
            <img src="../assets/like_icon.png" alt="Like Icon" />
        </button></li>
    )
}

export default LikeBtn