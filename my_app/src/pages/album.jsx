import './album.css'
import { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import AlbumHero from '../components/album_hero'
import SongList from '../components/song_list'
import ErrorCard from '../components/error_card'
import LoadingCard from '../components/loading_card'

// ================
// Flow
// ================
//
// - First render has no data -> immediate re-render to pull data
// - Handlers run -> re-render, then immediate re-render to pull data

function Album() {
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
        loadState: "loading"
    })

    const params = useParams()
    const albumId = Number(params.id)

    const navigate = useNavigate()

    // If param not available
    if (isNaN(albumId)) {
        return <Navigate to="/" replace />;
    }

    // If album not found
    let albumData = []
    let filteredAlbumData = []
    let chosenAlbumData = []
    let likedSongs = []
    let likedAlbums = []
    let likedAlbumsData = []
    let songData = []
    let artistData = []
    let filteredAlbumMap = {}
    let artistMap = {}
    if (musicData.loadState == 'loaded') {
        albumData = musicData.albums
        filteredAlbumData = albumData.filter(album => album.id == albumId)
        likedAlbums = musicData.liked_albums

        likedAlbumsData = albumData.filter(album => likedAlbums.some(likedAlbum => likedAlbum.album_id === album.id))

        chosenAlbumData = filteredAlbumData[0]

        if (likedAlbums.some(likedAlbum => likedAlbum.album_id === chosenAlbumData.id)) {
            chosenAlbumData = {...chosenAlbumData, isLiked: true}
        } else chosenAlbumData = {...chosenAlbumData, isLiked: false}

        if (filteredAlbumData.length === 0) {
            return <Navigate to="/" replace />
        }

        likedSongs = musicData.liked_songs
        songData = musicData.songs.filter(song => song.album_id == chosenAlbumData.id).map(song => {
            if (likedSongs.some(likedSong => likedSong.song_id == song.id)) {
                song.isLiked = true
            } else song.isLiked = false

            return song
        })

        filteredAlbumMap = Object.fromEntries(filteredAlbumData.map(album => [album.id, album]))

        artistData = musicData.artists.filter(artist => artist.id == chosenAlbumData.artist_id)
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
    }

    const handleRemoveLikedAlbum = async (albumId) => {
        try {
            const res = await fetch(
                `/api/liked-albums?type=removeAlbumFromLiked&albumId=${albumId}`, 
                {
                    method: "DELETE"
                }
            )

            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
        } catch (error) {console.error('Fetch failed:', error)}

        reload()
    }

    const handleAddAlbumToLiked = async (albumId) => {
        try {
            const res = await fetch(
                `/api/liked-albums?type=addAlbumToLiked&albumId=${albumId}`,
                {
                    method: "POST"
                }
            )

            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
        } catch (error) {console.error('Fetch failed:', error)}

        reload()
    }

    const handleDeleteAlbum = async (id) => {
        try {
            const res = await fetch(
                `/api/albums/${id}`,
                {
                    method: "DELETE"
                }
            )

            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)
        } catch (error) {console.error('Fetch failed:', error)}

        navigate('/')
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

            // console.log(JSON.stringify(db, null, 2))
        }

        loadData()
    }, [count])

    return (
        <div className="album-wrapper">
            <Sidebar likedAlbumsData={likedAlbumsData} />
            {musicData.loadState == 'loaded' ? (
                <>
                    <AlbumHero setListFormat={setListFormat} handleRemoveLikedAlbum={handleRemoveLikedAlbum} handleAddAlbumToLiked={handleAddAlbumToLiked} handleDeleteAlbum={handleDeleteAlbum} chosenAlbum={chosenAlbumData} artist={artistMap[chosenAlbumData.artist_id].name} count={songData.length} />
                    <SongList listFormat={listFormat} handleRemoveLikedSong={handleRemoveLikedSong} handleAddSongToLiked={handleAddSongToLiked} songData={songData} albumMap={filteredAlbumMap} artistMap={artistMap} />
                </>
            ) : musicData.loadState == 'errored' ? (
                <>
                    <AlbumHero setListFormat={() => {}} handleRemoveLikedAlbum={() => {}} handleAddAlbumToLiked={() => {}} handleDeleteAlbum={handleDeleteAlbum} chosenAlbum={{}} artist="" count="" />
                    <ErrorCard />
                </>
            ) : (
                <>
                    <AlbumHero setListFormat={() => {}} handleRemoveLikedAlbum={() => {}} handleAddAlbumToLiked={() => {}} handleDeleteAlbum={handleDeleteAlbum} chosenAlbum={{}} artist="" count="" />
                    <LoadingCard />
                </>
            )}
        </div>
    )
}

export default Album
