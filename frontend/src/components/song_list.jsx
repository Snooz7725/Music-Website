import './song_list.css'

function SongList({ listFormat, handleRemoveLikedSong, handleAddSongToLiked, songData, albumMap, artistMap}) {
    return (
        <div className="song-list-wrapper">
            <div className="song-grid">
                <div className="song-row song-header">
                    <div className="song-title"><span>Title</span></div>
                    <hr/>
                    <div className="song-album"><span>Album</span></div>
                </div>
                {songData.map(song => {
                    return listFormat ? (
                        <div key={song.id} className="song-row minimized">
                            <div className="song-title">
                                <div className="like-btn-outer-wrapper">
                                    <button className="like-btn-wrapper" onClick={() => song.isLiked ? handleRemoveLikedSong(song.id) : handleAddSongToLiked(song.id)}>
                                        <img src={song.isLiked ? "/images/ui/transparent_heart_btn.png" : "/images/ui/empty_heart_btn.png"} alt="Like Button" />
                                    </button>
                                </div>

                                <div className="song-details">
                                    <span className="title">{song.title}</span>
                                    <span className="artist">{`By | ${artistMap[song.artist_id].name}`}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="song-album"><span>{albumMap[song.album_id].title}</span></div>
                        </div>
                    ) : (
                        <div key={song.id} className="song-row">
                            <div className="song-title">
                                <div className="like-btn-outer-wrapper">
                                    <button className="like-btn-wrapper" onClick={() => song.isLiked ? handleRemoveLikedSong(song.id) : handleAddSongToLiked(song.id)}>
                                        <img src={song.isLiked ? "/images/ui/transparent_heart_btn.png" : "/images/ui/empty_heart_btn.png"} alt="Like Button" />
                                    </button>
                                </div>

                                <div className="song-thumbnail-wrapper">
                                    <img src={song.thumbnail} alt={song.title} />
                                </div>
                                <div className="song-details">
                                    <span className="title">{song.title}</span>
                                    <span className="artist">{`By | ${artistMap[song.artist_id].name}`}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="song-album"><span>{albumMap[song.album_id].title}</span></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SongList