import './album.css'
import { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import AlbumHero from '../components/album_hero'
import SongList from '../components/song_list'
import ErrorCard from '../components/error_card'
import LoadingCard from '../components/loading_card'

function Album() {
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

    const navigate = useNavigate()

    const params = useParams()

    const albumId = Number(params.id)
    // console.log(params.id)

    // If param not available
    if (isNaN(albumId)) {
        return <Navigate to="/" replace />;
    }

    // If album not found
    let albumData = null
    let chosenAlbumData = []
    let likedSongs = []
    let songData = null
    let artistData = null
    let albumMap = {}
    let artistMap = {}
    if (loadStatus == 'loaded') {
        albumData = musicData.albums.data.filter(album => album.id == albumId)

        if (albumData.length === 0) {
            return <Navigate to="/" replace />
        }

        chosenAlbumData = albumData[0];

        likedSongs = musicData.liked_songs.data;
        songData = musicData.songs.data.filter(song => song.album_id == chosenAlbumData.id).map(song => {
            if (likedSongs.some(likedSong => likedSong.song_id == song.id)) {
                song.isLiked = true;
            } else song.isLiked = false;

            return song;
        })

        albumMap = Object.fromEntries(albumData.map(album => [album.id, album, album.thumbnail]))

        artistData = musicData.artists.data.filter(artist => artist.id == chosenAlbumData.artist_id)
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

    const handleDeleteAlbum = async (id) => {
        let resJson = {}
        try {
            const res = await fetch(
                `/api/albums/${id}`,
                {
                    method: "DELETE"
                }
            )

            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)

            resJson = await res.json()
        } catch (error) {console.error('Fetch failed:', error)}

        navigate('/')
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
        <div className="album-wrapper">
            <Sidebar />
            { loadStatus == 'loaded' ? (
                <>
                    <AlbumHero handleDeleteAlbum={handleDeleteAlbum} albumId={chosenAlbumData.id} thumbnail={albumMap[chosenAlbumData.id].thumbnail} albumTitle={chosenAlbumData.title} artist={artistMap[chosenAlbumData.artist_id].name} count={albumData.length} />
                    <SongList handleRemoveLikedSong={handleRemoveLikedSong} handleAddSongToLiked={handleAddSongToLiked} songData={songData} albumMap={albumMap} artistMap={artistMap} likedSongs={likedSongs} />
                </>
            ) : loadStatus == 'errored' ? (
                <>
                    <AlbumHero handleDeleteAlbum={handleDeleteAlbum} albumId="ERROR" albumTitle="ERROR" artist="" releaseDate="YYYY-MM-DD" count="" />
                    <ErrorCard />
                </>
            ) : (
                <>
                    <AlbumHero handleDeleteAlbum={handleDeleteAlbum} albumId="loading..." albumTitle="Loading..." artist="" releaseDate="YYYY-MM-DD" count="" />
                    <LoadingCard />
                </>
            )}
        </div>
    )
}

export default Album
