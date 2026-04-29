import "./song_list.css"

function SongList({ songData, albumData, artistData}) {
    const albumMap = Object.fromEntries(albumData.map(album => [album.id, album]))
    const artistMap = Object.fromEntries(artistData.map(artist => [artist.id, artist]))

    return (
        <div className="song-list-wrapper">
            <div className="song-grid">
                <div className="song-row song-header">
                    <div className="song-title"><span>Title</span></div>
                    <hr/>
                    <div className="song-album"><span>Album</span></div>
                    <hr/>
                    <div className="song-duration"><span>Duration</span></div>
                </div>
                {songData.map(song => (
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
                                <span className="title">{song.title}</span>
                                <span className="artist">{artistMap[song.artist_id].name}</span>
                            </div>
                        </div>
                        <hr/>
                        <div className="song-album"><span>{albumMap[song.album_id].title}</span></div>
                        <hr/>
                        <div className="song-duration"><span>{Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SongList