import './song_add.css'
import { useState, useEffect } from 'react'
import Searchbar from '../components/searchbar'
import Sidebar from '../components/sidebar'
import SongAddPanel from '../components/song_add_panel'

function SongAdd() {
    const [musicData, setMusicData] = useState({
        albums: [],
        songs: [],
        liked_albums: [],
        liked_songs: [],
        loadState: [],
    })

    let likedAlbumsData = []
    let likedSongsCount = null
    if (musicData.loadState == 'loaded') {
        likedAlbumsData = musicData.albums.filter(album => musicData.liked_albums.some(likedAlbum => likedAlbum.album_id === album.id))
        likedAlbumsData = likedAlbumsData.map(likedAlbum => {
            // Count amount of songs that share album id and include it into the likedAlbumsData
            let songCount = musicData.songs.reduce((acc, song) => {
                if (song.album_id === likedAlbum.id) {
                    return ++acc
                } else return acc
            }, 0)

            likedAlbum.count = songCount
            return likedAlbum
        })

        likedSongsCount = musicData.liked_songs.reduce(acc => ++acc, 0)
    }

    useEffect(() => {
        async function loadData() {
            let errorFlag = false
            let db = {}
            try {
                const response = await fetch(`/api/data?type=all`, { 
                    method: 'GET'
                })

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }

                db = await response.json()
            } catch (error) {
                console.error('Fetch failed:', error)
                errorFlag = true
            } finally {
                if (errorFlag) {
                    setMusicData({
                        albums: [],
                        songs: [],
                        liked_albums: [],
                        liked_songs: [],
                        loadState: 'errored'
                    })
                } else setMusicData({
                    albums: db.data.albums.data,
                    songs: db.data.songs.data,
                    liked_albums: db.data.liked_albums.data,
                    liked_songs: db.data.liked_songs.data,
                    loadState: 'loaded'
                })
                
            }
        }

        loadData()
    })

    return (
        <div className="song-add-wrapper">
            <Sidebar likedAlbumsData={likedAlbumsData} likedSongsCount={likedSongsCount} />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <div className="panel-img-wrapper">
                        <img src="/assets/microphone.jpg" alt="" />
                    </div>
                    <SongAddPanel />
                </div>
            </div>
        </div>
    )
}

export default SongAdd
