import './home.css'
import { useState, useEffect } from 'react'
import Searchbar from '../components/searchbar'
import Sidebar from '../components/sidebar'
import Hero from '../components/hero'
import Category from '../components/category'
import AlbumCategoryCard from '../components/album_category_card'
import SongCategoryCard from '../components/song_category_card'
import LoadingCard from '../components/loading_card'
import ErrorCard from '../components/error_card'

function HomePage() {
    const [musicData, setMusicData] = useState({
        albums: [],
        songs: [],
        artists: [],
        liked_albums: [],
        liked_songs: [],
        loadState: 'loading',
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

    let albumData = []
    let artistMap = {}
    let albumMap = {}
    let likedAlbumsData = []
    let likedSongsCount = null
    if (musicData.loadState == 'loaded') {
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

        albumMap = Object.fromEntries(Object.entries(albumData))
        artistMap = Object.fromEntries(Object.entries(musicData.artists))
    }

    return (
        <div className="home-wrapper">
            <Sidebar likedAlbumsData={likedAlbumsData} likedSongsCount={likedSongsCount} />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <Hero />
                    {(musicData.loadState == 'loaded') ? (
                        <>
                            <Category title="Songs">
                                {musicData.songs.map(song => (
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
                                {albumData.map(album => (
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
                    ) : (musicData.loadState == 'loading') ? (
                        <LoadingCard />
                    ) : (
                        <ErrorCard />
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage
