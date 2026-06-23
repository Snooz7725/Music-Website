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
    const [listFormat, setListFormat] = useState(false)
    const [musicData, setMusicData] = useState({
        albums: [],
        songs: [],
        artists: [],
        liked_songs: [],
        liked_albums: [],
        loadState: [],
    })

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
                        artists: [],
                        liked_songs: [],
                        liked_albums: [],
                        loadState: 'errored'
                    })
                } else setMusicData({
                    albums: db.data.albums.data,
                    songs: db.data.songs.data,
                    artists: db.data.artists.data,
                    liked_songs: db.data.liked_songs.data,
                    liked_albums: db.data.liked_albums.data,
                    loadState: 'loaded'
                })
                
            }
        }

        loadData()
    }, [count])

    // If album not found
    let albumData = []
    let likedSongs = []
    let likedAlbums = []
    let likedAlbumsData = []
    let likedSongsCount = null
    let songData = []
    let artistData = []
    let albumMap = {}
    let artistMap = {}
    if (musicData.loadState == 'loaded') {
        albumData = musicData.albums
        likedAlbums = musicData.liked_albums

        likedAlbumsData = albumData.filter(album => likedAlbums.some(likedAlbum => likedAlbum.album_id === album.id))
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

        if (albumData.length === 0) {
            return <Navigate to="/" replace />
        }

        likedSongs = musicData.liked_songs
        songData = musicData.songs.filter(song => likedSongs.some(likedSong => likedSong.song_id == song.id)).map(likedSong => ({
            ...likedSong,
            isLiked: true
        }));
        
        albumMap = Object.fromEntries(albumData.map(album => [album.id, album]))
        
        artistData = musicData.artists.filter(artist => songData.some(song => song.artist_id == artist.id))
        artistMap = Object.fromEntries(artistData.map(artist => [artist.id, artist]))
    }

    const handleRemoveLikedSong = async (songId) => {
        try {
            const res = await fetch(
                `/api/liked-songs?type=removeSongFromLiked&songId=${songId}`, 
                {
                    method: "DELETE"
                }
            )

            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
        } catch (error) {console.error('Fetch failed:', error)}

        reload()
    }

    const handleAddSongToLiked = async (songId) => {
        console.log("handleAddSongToLiked running..")
        try {
            const res = await fetch(
                `/api/liked-songs?type=addSongToLiked&songId=${songId}`,
                {
                    method: "POST"
                }
            )

            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
        } catch (error) {console.error('Fetch failed:', error)}

        reload()
        console.log("handleAddSongToLiked finished")
    }

    return (
        <div className="liked-wrapper">
            <Sidebar likedAlbumsData={likedAlbumsData} likedSongsCount={likedSongsCount} />
            {musicData.loadState == 'loaded' ? (
                <>
                    <LikedSongsHero setListFormat={setListFormat} count={songData.length} />
                    <SongList listFormat={listFormat} handleRemoveLikedSong={handleRemoveLikedSong} handleAddSongToLiked={handleAddSongToLiked} songData={songData} albumMap={albumMap} artistMap={artistMap} />
                </>
            ) : musicData.loadState == 'errored' ? (
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
