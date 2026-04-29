import "./album_hero.css"

function AlbumHero({ albumTitle, artist, releaseDate, count }) {
    return (
        <div className="album-hero-wrapper">
            <div className="top-section">
                <div className="img-wrapper">
                    <img src="/assets/album_placeholder.jpg" alt="Album Cover"/>
                </div>
                <div className="album-info">
                    <h1 className="title">{albumTitle}</h1>
                    <p className="artist-name">{artist}</p>
                    <p className="release-date">Release Date: {releaseDate}</p>
                    <p className="song-count">Count: {count}</p>
                </div>
            </div>
            <ul className="btn-list">
                <li><button className="list-btn"><img src="/assets/list_btn.png" alt="Format Icon" /></button></li>
                <li><button><img src="/assets/empty_heart_btn.png" alt="Like Icon" /></button></li>
            </ul>
        </div>
    )
}

export default AlbumHero