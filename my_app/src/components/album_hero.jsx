import './album_hero.css'

function AlbumHero({ handleRemoveLikedAlbum, handleAddAlbumToLiked, handleDeleteAlbum, chosenAlbum, artist, count }) {
    return (
        <div className="album-hero-wrapper">
            <div
                className="album-hero-bg"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url('/assets/${chosenAlbum.thumbnail}')` }}
            />
            <div className="top-section">
                <div className="img-wrapper">
                    <img src="/assets/album_placeholder.jpg" alt="Album Cover"/>
                </div>
                <div className="album-info">
                    <h1 className="title">{chosenAlbum.title}</h1>
                    <p className="artist-name">{`Artist | ${artist}`}</p>
                    <p className="song-count">{`Count | ${count}`}</p>
                </div>
            </div>
            <ul className="btn-list">
                <li><button className="list-btn"><img src="/assets/list_btn.png" alt="Format Icon" /></button></li>
                <li><button className="like-btn" onClick={() => {chosenAlbum.isLiked ? handleRemoveLikedAlbum(chosenAlbum.id) : handleAddAlbumToLiked(chosenAlbum.id)}}><img src={chosenAlbum.isLiked ? '/assets/transparent_heart_btn.png' : '/assets/empty_heart_btn.png'} alt="Like Icon" /></button></li>
                <li><button className="delete-btn" onClick={() => handleDeleteAlbum(chosenAlbum.id)}><img src="/assets/white_closed_bin.png" alt="" /></button></li>
            </ul>
        </div>
    )
}

export default AlbumHero
