import './liked_hero.css'

function LikedSongsHero({ setListFormat, count }) {
    return (
        <div className="liked-hero-wrapper">
            <div className="liked-hero-bg"/>
            <div className="top-section">
                <div className="img-wrapper">
                    <img src="/images/ui/transparent_heart_btn.png" alt="Album Cover"/>
                </div>
                <div className="liked-info">
                    <h1 className="title">Liked Songs</h1>
                    <p className="song-count">{`Count | ${count}`}</p>
                </div>
            </div>
            <ul className="btn-list">
                <li><button className="list-btn" onClick={() => setListFormat(prev => !prev)}><img src="/images/ui/list_btn.png" alt="Format Icon" /></button></li>
            </ul>
        </div>
    )
}

export default LikedSongsHero
