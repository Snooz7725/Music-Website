import Sidebar from "../components/sidebar"
import "./album.css"
import AlbumHero from "../components/album_hero"
import SongList from "../components/song_list"
import { useParams } from "react-router-dom"
import musicData from "../data/db.json"

function Album() {
    const { albums, songs } = musicData
    const params = useParams()
    const routeAlbumId = Number(params.id)
    const chosenAlbum = albums.find(album => album.id === routeAlbumId)
    const albumSongs = songs.filter(song => song.albumId === chosenAlbum?.id)

    return (
        <div className="album-wrapper">
            <Sidebar />
            <AlbumHero title={chosenAlbum.title ?? "Unknown Album"} artist={chosenAlbum.artist ?? "Unknown Artist"} releaseDate={chosenAlbum.releaseDate ?? "-"} count={albumSongs.length} />
            <SongList albumId={routeAlbumId} />
        </div>
    )
}

export default Album