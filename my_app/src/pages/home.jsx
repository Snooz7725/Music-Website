import "./home.css"
import { useState, useEffect } from "react"
import Searchbar from "../components/searchbar"
import Sidebar from "../components/sidebar"
import Hero from "../components/hero"
import Category from "../components/category"
import AlbumCategoryCard from "../components/album_category_card"
import SongCategoryCard from "../components/song_category_card"
import LoadingCard from "../components/loading_card"
import ErrorCard from "../components/error_card"

function HomePage() {
    useEffect(() => { // useEffects are for running things after the rendering process
        let errorFlag = false

        async function loadData() {
            try {
                const response = await fetch(`/api/data?type=all`, { 
                    method: "GET"
                })

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }

                const db = await response.json()
                setMusicData(db.data)
            } catch (error) {
                console.error("Fetch failed:", error)
                errorFlag = true
            } finally {
                if (errorFlag) {
                    setLoadStatus("errored")
                } else setLoadStatus("loaded")
                
            }
        }

        loadData()
    }, [])

    const [loadStatus, setLoadStatus] = useState("loading")
    const [musicData, setMusicData] = useState({
        albums: [],
        songs: [],
        artists: [],
    })

    let albumMap = {}
    let artistMap = {}

    if (musicData.albums.length != 0) {
        albumMap = Object.fromEntries(musicData.albums.map(album => [album.id, album]))
        artistMap = Object.fromEntries(musicData.artists.map(artist => [artist.id, artist]))
    }

    return (
        <div className="home-wrapper">
            <Sidebar />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <Hero />
                    {loadStatus == "loading" ? (
                        <LoadingCard />
                    ) : loadStatus == "loaded" ? (
                        <>
                            <Category title="Songs">
                                {musicData.songs.map((song) => (
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
                                {musicData.albums.map((album) => (
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
                    ) : loadStatus == "loading" ? (
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
