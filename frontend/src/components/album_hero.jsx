import './album_hero.css'

function AlbumHero({ setListFormat, handleRemoveLikedAlbum, handleAddAlbumToLiked, handleDeleteAlbum, chosenAlbum, artist, count }) {
    return (
        <div className="album-hero-wrapper">
            <div
                className="album-hero-bg"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url('${chosenAlbum.thumbnail}')` }}
            />
            <div className="top-section">
                <div className="img-wrapper">
                    <img src={chosenAlbum.thumbnail ?? "/images/ui/github.svg"} alt="Album Cover"/>
                </div>
                <div className="album-info">
                    <h1 className="title">{chosenAlbum.title}</h1>
                    <p className="artist-name">{`Artist | ${artist}`}</p>
                    <p className="song-count">{`Count | ${count}`}</p>
                </div>
            </div>
            <ul className="btn-list">
                <li><button className="list-btn" onClick={() => setListFormat(prev => !prev)}><img src="/images/ui/list_btn.png" alt="Format Icon" /></button></li>
                <li><button className="like-btn" onClick={() => {chosenAlbum.isLiked ? handleRemoveLikedAlbum(chosenAlbum.id) : handleAddAlbumToLiked(chosenAlbum.id)}}><img src={chosenAlbum.isLiked ? '/images/ui/transparent_heart_btn.png' : '/images/ui/empty_heart_btn.png'} alt="Like Icon" /></button></li>
                <li><button className="delete-btn" onClick={() => handleDeleteAlbum(chosenAlbum.id)}><img src="/images/ui/white_closed_bin.png" alt="" /></button></li>
            </ul>
        </div>
    )
}

export default AlbumHero
