import "./album.css"
import { useState, useEffect } from "react"
import Sidebar from "../components/sidebar"
import LikedSongsHero from "../components/liked_hero"
import SongList from "../components/song_list"
import ErrorCard from "../components/error_card"
import LoadingCard from "../components/loading_card"

function Liked() {
    useEffect(() => {
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

    // if any [subject] has a specified [subject] then keep it, else filter it out 
    const songData = musicData.songs.filter(song => musicData.liked_songs.some(likedSong => likedSong.song_id === song.id))
    const artistData = musicData.artists.filter(artist => songData.some(song => song.artist_id === artist.id))
    const albumData = musicData.albums.filter(album => songData.some(song => song.album_id === album.id))

    const albumMap = Object.fromEntries(albumData.map(album => [album.id, album]))
    const artistMap = Object.fromEntries(artistData.map(artist => [artist.id, artist]))

    return (
        <div className="album-wrapper">
            <Sidebar />
            { loadStatus == "loaded" ? (
                <>
                    <LikedSongsHero count={songData.length} />
                    <SongList songData={songData} albumMap={albumMap} artistMap={artistMap} />
                </>
            ) : loadStatus == "errored" ? (
                <>
                    <LikedSongsHero count={"ERROR"} />
                    <ErrorCard />
                </>
            ) : (
                <>
                    <LikedSongsHero count={"Loading..."} />
                    <LoadingCard />
                </>
            )}
        </div>
    )
}

export default Liked
