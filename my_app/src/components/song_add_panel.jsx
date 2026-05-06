import './song_add_panel.css'

function SongAddPanel() {
    return (
        <div className="song-add-panel-wrapper">
            <div className="hero">
                <img src="./assets/album_placeholder.jpg" alt="" />
            </div>
            <div className="input-wrapper">
                <input type="text"/>
                <input type="text"/>
                <div>
                    <button>Album</button>
                    <button>Song</button>
                </div>
            </div>
            <hr></hr>
            <button className="search-btn">
                <img src="./assets/search_btn.png" alt="" />
            </button>
        </div>
    )
};

export default SongAddPanel