import "./song_add.css"
import { useState } from "react"
import Searchbar from "../components/searchbar"
import Sidebar from "../components/sidebar"
import SongAddPanel from "../components/song_add_panel"

function SongAdd() {
    // Callback reporting from child -> parent
    const [btnState, setBtnState] = useState(null)

    return (
        <div className="song-add-wrapper">
            <Sidebar />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <div className="img-wrapper">
                        <img src="/assets/drummer.jpg" alt="" />
                    </div>
                    <SongAddPanel />
                </div>
            </div>
        </div>
    )
}

export default SongAdd
