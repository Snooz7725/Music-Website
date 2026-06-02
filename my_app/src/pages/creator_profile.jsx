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
    useEffect(() => {
        let errorFlag = false

        async function loadData() {
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
                } else {
                    setLoadStatus('loaded')
                }
            }
        }

        loadData()
    }, [])

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

    let artistData = null
    let artistAlbums = []
    let artistSongs = []
    let albumMap = {}
    let artistMap = {}

    if (loadStatus === 'loaded') {
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

    return (
        <div className="creator-profile-wrapper">
            <Sidebar />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    {loadStatus === 'loaded' ? (
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
                    ) : loadStatus === 'errored' ? (
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
