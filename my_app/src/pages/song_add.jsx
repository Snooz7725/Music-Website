import './song_add.css'
import { useState, useEffect } from 'react'
import Searchbar from '../components/searchbar'
import Sidebar from '../components/sidebar'
import SongAddPanel from '../components/song_add_panel'

function SongAdd() {
    const [musicData, setMusicData] = useState({
        albums: [],
        liked_albums: [],
        loadState: [],
    })

    let likedAlbumsData = []
    if (musicData.loadState == 'loaded') {
        likedAlbumsData = musicData.albums.filter(album => musicData.liked_albums.some(likedAlbum => likedAlbum.album_id === album.id))
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
                        liked_albums: [],
                        loadState: 'errored'
                    })
                } else setMusicData({
                    albums: db.data.albums.data,
                    liked_albums: db.data.liked_albums.data,
                    loadState: 'loaded'
                })
                
            }
        }

        loadData()
    })

    return (
        <div className="song-add-wrapper">
            <Sidebar likedAlbumsData={likedAlbumsData}  />
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
