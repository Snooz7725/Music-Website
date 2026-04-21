import { useState } from "react"
import "./format_btn.css"

function FormatBtn() {
    const [format, setFormat] = useState(false)

    return (
        <li><button>
            <img src="../assets/format_icon.png" alt="Format Icon" />
        </button></li>
    )
}

export default FormatBtn