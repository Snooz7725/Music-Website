import './liked.css'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import LikedSongsHero from '../components/liked_hero'
import SongList from '../components/song_list'
import ErrorCard from '../components/error_card'
import LoadingCard from '../components/loading_card'

function Liked() {
    function reload() {
        setCount(prev => ++prev)
    }

    const [count, setCount] = useState(0)
    const [loadStatus, setLoadStatus] = useState('loading')
    const [musicData, setMusicData] = useState({
        albums: [],
        songs: [],
        artists: [],
        liked_songs: [],
        liked_albums: []
    })

    // If album not found
    let albumData = null
    let likedSongs = []
    let songData = null
    let artistData = null
    let albumMap = {}
    let artistMap = {}
    if (loadStatus == 'loaded') {
        albumData = musicData.albums.data

        if (albumData.length === 0) {
            return <Navigate to="/" replace />
        }

        likedSongs = musicData.liked_songs.data
        songData = musicData.songs.data.filter(song => likedSongs.some(likedSong => likedSong.song_id == song.id)).map(likedSong => ({
            ...likedSong,
            isLiked: true
        }));

        albumMap = Object.fromEntries(albumData.map(album => [album.id, album, album.thumbnail]))
        
        artistData = musicData.artists.data.filter(artist => songData.some(song => song.artist_id == artist.id))
        artistMap = Object.fromEntries(artistData.map(artist => [artist.id, artist]))
    }

    const handleRemoveLikedSong = async (songId) => {
        let resJson = {}
        try {
            const res = await fetch(
                `/api/liked-songs?type=removeSongFromLiked&songId=${songId}`, 
                {
                    method: "DELETE"
                }
            )

            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)

            resJson = await res.json()
        } catch (error) {console.error('Fetch failed:', error)}

        reload()
    }

    const handleAddSongToLiked = async (songId) => {
        console.log("handleAddSongToLiked running..")
        let resJson = {}
        try {
            const res = await fetch(
                `/api/liked-songs?type=addSongToLiked&songId=${songId}`,
                {
                    method: "POST"
                }
            )

            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)

            resJson = await res.json()
        } catch (error) {console.error('Fetch failed:', error)}

        reload()
        console.log("handleAddSongToLiked finished")
    }
    
    useEffect(() => {
        let errorFlag = false
        async function loadData(errorFlag) {
            try {
                const response = await fetch(`/api/data?type=all`, { 
                    method: 'GET'
                })

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }

                const db = await response.json()
                setMusicData(db.data)
            } catch (error) {
                console.error('Fetch failed:', error)
                errorFlag = true
            } finally {
                if (errorFlag) {
                    setLoadStatus('errored')
                } else setLoadStatus('loaded')
                
            }
        }

        loadData()
    }, [count])

    return (
        <div className="liked-wrapper">
            <Sidebar />
            { loadStatus == 'loaded' ? (
                <>
                    <LikedSongsHero count={songData.length} />
                    <SongList handleRemoveLikedSong={handleRemoveLikedSong} handleAddSongToLiked={handleAddSongToLiked} songData={songData} albumMap={albumMap} artistMap={artistMap} likedSongs={likedSongs} />
                </>
            ) : loadStatus == 'errored' ? (
                <>
                    <LikedSongsHero count="ERROR" />
                    <ErrorCard />
                </>
            ) : (
                <>
                    <LikedSongsHero count="Loading..." />
                    <LoadingCard />
                </>
            )}
        </div>
    )
}

export default Liked
