import "./song_add.css"
import Searchbar from "../components/searchbar"
import Sidebar from "../components/sidebar"
import SongAddPanel from "../components/song_add_panel"

function SongAdd() {
    return (
        <div className="song-add-wrapper">
            <Sidebar />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <div className="img-wrapper">
                        <img src="" alt="" />
                    </div>
                    <SongAddPanel />
                </div>
            </div>
        </div>
    )
}

export default SongAdd
