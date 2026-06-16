import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import './creator_profile.css'
import Searchbar from '../components/searchbar'
import Sidebar from '../components/sidebar'
import CreatorHero from '../components/creator_hero'
import Category from '../components/category'
import AlbumCategoryCard from '../components/album_category_card'
import SongCategoryCard from '../components/song_category_card'
import ErrorCard from '../components/error_card'
import LoadingCard from '../components/loading_card'

function CreatorProfile() {
    const [loadStatus, setLoadStatus] = useState('loading')
    const [musicData, setMusicData] = useState({
        albums: [],
        songs: [],
        artists: [],
    })

    const params = useParams()
    const artistId = Number(params.id)

    if (Number.isNaN(artistId)) {
        return <Navigate to="/" replace />
    }

    let albumData = []
    let likedAlbumsData = []
    let likedSongsCount = null
    let artistData = []
    let artistAlbums = []
    let artistSongs = []
    let albumMap = {}
    let artistMap = {}
    if (musicData.loadState === 'loaded') {
        albumData = musicData.albums
        likedAlbumsData = albumData.filter(album => musicData.liked_albums.some(likedAlbum => likedAlbum.album_id === album.id))
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
        artistData = musicData.artists.find(artist => artist.id === artistId)

        if (!artistData) {
            return <Navigate to="/" replace />
        }

        artistAlbums = musicData.albums.filter(album => album.artist_id === artistId)
        artistSongs = musicData.songs.filter(song => song.artist_id === artistId)
        albumMap = Object.fromEntries(musicData.albums.map(album => [album.id, album]))
        artistMap = Object.fromEntries(musicData.artists.map(artist => [artist.id, artist]))
        // console.log(JSON.stringify(artistMap, null, 2))
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
                        liked_albums: [],
                        liked_songs: [],
                        loadState: 'errored'
                    })
                } else setMusicData({
                    albums: db.data.albums.data,
                    songs: db.data.songs.data,
                    artists: db.data.artists.data,
                    liked_albums: db.data.liked_albums.data,
                    liked_songs: db.data.liked_songs.data,
                    loadState: 'loaded'
                })
                
            }
        }

        loadData()
    }, [])

    return (
        <div className="creator-profile-wrapper">
            <Sidebar likedAlbumsData={likedAlbumsData} likedSongsCount={likedSongsCount}/>
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    {musicData.loadState === 'loaded' ? (
                        <>
                            <CreatorHero
                                artistName={artistData.name}
                                albumCount={artistAlbums.length}
                                songCount={artistSongs.length}
                            />
                            <Category title="Songs">
                                {artistSongs.map(song => (
                                    <SongCategoryCard
                                        key={song.id}
                                        songId={song.id}
                                        albumId={albumMap[song.album_id].id}
                                        title={song.title}
                                        albumTitle={albumMap[song.album_id].title}
                                        artist={artistMap[song.artist_id].name}
                                        artistId={song.artist_id}
                                        filePath={song.thumbnail}
                                    />
                                ))}
                            </Category>

                            <Category title="Albums">
                                {artistAlbums.map(album => (
                                    <AlbumCategoryCard
                                        key={album.id}
                                        albumId={album.id}
                                        albumTitle={album.title}
                                        artist={artistMap[album.artist_id].name}
                                        artistId={album.artist_id}
                                        filePath={album.thumbnail}
                                    />
                                ))}
                            </Category>
                        </>
                    ) : musicData.loadState === 'loaded' ? (
                        <ErrorCard />
                    ) : (
                        <LoadingCard />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreatorProfile
