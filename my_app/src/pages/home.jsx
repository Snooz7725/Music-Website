import './home.css'
import { useState, useEffect } from 'react'
import { data, useLocation } from 'react-router-dom';
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
        state: 'loading',
        data: null
    })

    let albumMap = {}
    let artistMap = {}

    // Optional chaining stops null or undefined values from throwing
    if (
        musicData.state == 'loaded' 
        && ((musicData.data?.albums?.data.length ?? 0) > 0)
        && ((musicData.data?.artists?.data.length ?? 0) > 0)) 
    {
        albumMap = Object.fromEntries(musicData.data.albums.data.map(album => [album.id, album]))
        artistMap = Object.fromEntries(musicData.data.artists.data.map(artist => [artist.id, artist]))
    }

    const location = useLocation();

    useEffect(() => { // useEffects are for running things after the rendering process
        async function loadData() {
            let errorFlag = false
            let resJson = {};

            try {
                const res = await fetch(`/api/data?type=all`, { 
                    method: 'GET'
                })

                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`)
                }

                resJson = await res.json()
            } catch (error) {
                console.error('Fetch failed:', error)
                errorFlag = true
            } finally {
                if (errorFlag) {
                    setMusicData({
                    state: 'error',
                    data: null
                })
                } else setMusicData({
                    state: 'loaded',
                    data: resJson.data
                })
            }
        }

        loadData()
    }, [location])

    return (
        <div className="home-wrapper">
            <Sidebar />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <Hero />
                    {(musicData.state == 'loaded') ? (
                        <>
                            <Category title="Songs">
                                {musicData.data.songs.data.map((song) => (
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
                                {musicData.data.albums.data.map((album) => (
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
                    ) : (musicData.state == 'loading') ? (
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
