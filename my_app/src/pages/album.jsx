import { useParams } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Sidebar from "../components/sidebar"
import "./album.css"
import AlbumHero from "../components/album_hero"
import SongList from "../components/song_list"
import musicData from "../data/db.json"

function Album() {
    // AlbumHero
    const { albums, songs } = musicData
    const params = useParams()
    const routeAlbumId = Number(params.id)
    // If params not available
    if (isNaN(routeAlbumId)) {
        return <Navigate to="/" replace />;
    }

    // If not found
    const albumData = albums.filter(album => album.id === routeAlbumId)
    if (typeof albumData == "undefined") {
        return <Navigate to="/" replace />;
    }
    const chosenAlbumData = albumData[0];

    const albumSongs = songs.filter(song => song.album_id === albumData?.id)

    // SongList
    const songData = songs.filter(songData => songData.album_id === routeAlbumId)

    return (
        <div className="album-wrapper">
            <Sidebar />
            <AlbumHero title={chosenAlbumData.title ?? "Unknown Album"} artist={chosenAlbumData.artist ?? "Unknown Artist"} releaseDate={chosenAlbumData.releaseDate ?? "-"} count={albumSongs.length} />
            <SongList albumData={albumData} songData={songData} />
        </div>
    )
}

export default Album