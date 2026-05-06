import { useParams } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Sidebar from "../components/sidebar"
import "./album.css"
import AlbumHero from "../components/album_hero"
import SongList from "../components/song_list"
import musicData from "../data/db.json"

function Album() {
    // AlbumHero
    const { albums, songs, artists } = musicData
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

    const albumSongs = songs.filter(song => song.album_id === chosenAlbumData.id)
    const artistData = artists.filter(artist => artist.id === chosenAlbumData.artist_id)
    const artistMap = Object.fromEntries(artistData.map(artist => [artist.id, artist]))


    // SongList
    const songData = songs.filter(songData => songData.album_id === routeAlbumId)

    return (
        <div className="album-wrapper">
            <Sidebar />
            <AlbumHero albumId={chosenAlbumData.id} albumTitle={chosenAlbumData.title ?? "Unknown Album"} artist={artistMap[chosenAlbumData.artist_id].name ?? "Unknown Artist"} releaseDate={chosenAlbumData.release_date ?? "-"} count={albumSongs.length} />
            <SongList albumData={albumData} songData={songData} artistData={artistData} />
        </div>
    )
}

export default Album