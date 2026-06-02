import './song_list.css'
import { useState } from 'react'

function SongList({ songData, albumMap, artistMap, likedSongs}) {
    async function handleAddSongToLiked(isLiked, song) {
        const resJson = {}
        if (isLiked) {
            // Take song from liked
            try {
                const res = fetch(`/api/liked-songs?type=removeSongFromLiked&songId=${song.id}`)

                if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)

                resJson = (await res).json()
            } catch (error) {console.error('Fetch failed:', error)}
        } else {
            // Add song to liked
            try {
                const res = fetch(`/api/liked-songs?type=addSongToLiked&songId=${song.id}`)

                if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)

                resJson = (await res).json()
            } catch (error) {console.error('Fetch failed:', error)}
        }
    }

    const [ reloadKey, setReloadKey ] = useState()

    return (
        <div className="song-list-wrapper">
            <div className="song-grid">
                <div className="song-row song-header">
                    <div className="song-title"><span>Title</span></div>
                    <hr/>
                    <div className="song-album"><span>Album</span></div>
                </div>
                {songData.map(song => {
                    const isLiked = likedSongs.some(likedSong => likedSong == song)

                    return (
                        <div key={song.id} className="song-row">
                            <div className="song-title">
                                <div className="like-btn-outer-wrapper">
                                    <button className="like-btn-wrapper" onClick={() => handleAddSongToLiked(isLiked, song)}>
                                        <img src={isLiked ? "/assets/transparent_heart_btn.png" : "/assets/empty_heart_btn.png"} alt="Like Button" />
                                    </button>
                                </div>

                                <div className="song-thumbnail-wrapper">
                                    <img src={'/assets/' + song.thumbnail} alt={song.title} />
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