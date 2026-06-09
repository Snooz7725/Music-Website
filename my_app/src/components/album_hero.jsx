import './album_hero.css'
import { useNavigate } from 'react-router-dom'

function AlbumHero({ handleDeleteAlbum, albumId, albumTitle, artist, releaseDate, count, thumbnail }) {
    return (
        <div className="album-hero-wrapper">
            <div
                className="album-hero-bg"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url('/assets/${thumbnail}')` }}
            />
            <div className="top-section">
                <div className="img-wrapper">
                    <img src="/assets/album_placeholder.jpg" alt="Album Cover"/>
                </div>
                <div className="album-info">
                    <h1 className="title">{albumTitle}</h1>
                    <p className="artist-name">{`Artist | ${artist}`}</p>
                    <p className="song-count">{`Count | ${count}`}</p>
                </div>
            </div>
            <ul className="btn-list">
                <li><button className="list-btn"><img src="/assets/list_btn.png" alt="Format Icon" /></button></li>
                <li><button className="like-btn"><img src="/assets/empty_heart_btn.png" alt="Like Icon" /></button></li>
                <li><button className="delete-btn" onClick={() => handleDeleteAlbum(albumId)}><img src="/assets/white_closed_bin.png" alt="" /></button></li>
            </ul>
        </div>
    )
}

export default AlbumHero
