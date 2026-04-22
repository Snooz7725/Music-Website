import musicData from "../data/db.json"
import "./song_list.css"

function SongList({ albumId }) {
    const { albums, songs } = musicData
    const albumSongs = songs.filter(song => song.albumId === albumId)
    const album = albums.find(album => album.id === albumId)

    return (
        <div className="song-list-wrapper">
            <div className="song-grid">
                {albumSongs.map(song => (
                    <div key={song.id} className="song-row">
                        <div className="song-title">
                            <div className="like-btn-outer-wrapper">
                                <div className="like-btn-wrapper">
                                    <img src="/assets/transparent_heart_btn.png" alt="Like Button" />
                                </div>
                            </div>

                            <div className="song-thumbnail-wrapper">
                                <img src={"/assets/" + song.thumbnail} alt={song.title} />
                            </div>
                            <div className="song-details">
                                <span>{song.title}</span>
                                <span>{song.artist}</span>
                            </div>
                        </div>
                        <div className="song-album"><span>{album?.title}</span></div>
                        <div className="song-duration"><span>{song.duration}</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SongList