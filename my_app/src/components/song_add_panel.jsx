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
                <div className='button-wrapper'>
                    <button className='album'>Album</button>
                    <button className='song'>Song</button>
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