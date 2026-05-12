import "./album.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Sidebar from "../components/sidebar"
import AlbumHero from "../components/album_hero"
import SongList from "../components/song_list"
import ErrorCard from "../components/error_card"
import LoadingCard from "../components/loading_card"

function Album() {
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
                    setLoading("errored")
                } else setLoading("loaded")
                
            }
        }

        loadData()
    }, [])

    const [loadStatus, setLoading] = useState("loading")
    const [musicData, setMusicData] = useState({
        albums: [],
        songs: [],
        artists: [],
    })

    const params = useParams()

    const albumId = Number(params.id)

    // If param not available
    if (isNaN(albumId)) {
        return <Navigate to="/" replace />;
    }

    // If album not found
    const albumData = musicData.albums.filter(album => album.id == albumId)
    if (typeof albumData == "undefined") {
        return <Navigate to="/" replace />;
    }

    const chosenAlbumData = albumData[0];

    const songData = musicData.songs.filter(song => song.album_id == chosenAlbumData.id)
    const artistData = musicData.artists.filter(artist => artist.id == chosenAlbumData.artist_id)

    const albumMap = Object.fromEntries(albumData.map(album => [album.id, album]))
    const artistMap = Object.fromEntries(artistData.map(artist => [artist.id, artist]))

    return (
        <div className="album-wrapper">
            <Sidebar />
            { loadStatus == "loaded" ? (
                <>
                    <AlbumHero albumId={chosenAlbumData.id} albumTitle={chosenAlbumData.title} artist={artistMap[chosenAlbumData.artist_id].name} releaseDate={chosenAlbumData.release_date} count={albumData.length} />
                    <SongList songData={songData} albumMap={albumMap} artistMap={artistMap} />
                </>
            ) : loadStatus == "errored" ? (
                <>
                    <AlbumHero albumId={albumId} albumTitle={"ERROR"} artist={""} releaseDate={"YYYY-MM-DD"} count={""} />
                    <ErrorCard />
                </>
            ) : (
                <>
                    <AlbumHero albumId={albumId} albumTitle={"Loading..."} artist={""} releaseDate={"YYYY-MM-DD"} count={""} />
                    <LoadingCard />
                </>
            )}
        </div>
    )
}

export default Album