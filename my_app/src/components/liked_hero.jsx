import "./liked_hero.css"

function LikedSongsHero({ count }) {
    return (
        <div className="Liked-hero-wrapper">
            <div className="top-section">
                <div className="img-wrapper">
                    <img src="/assets/album_placeholder.jpg" alt="Album Cover"/>
                </div>
                <div className="album-info">
                    <h1 className="title">Liked Songs</h1>
                    <p className="song-count">Count: {count}</p>
                </div>
            </div>
            <ul className="btn-list">
                <li><button className="list-btn"><img src="/assets/list_btn.png" alt="Format Icon" /></button></li>
            </ul>
        </div>
    )
}

export default LikedSongsHero