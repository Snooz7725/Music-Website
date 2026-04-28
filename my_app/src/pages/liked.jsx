import Sidebar from "../components/sidebar"
import "./album.css"
import LikedSongsHero from "../components/liked_hero"
import SongList from "../components/song_list"
import musicData from "../data/db.json"

function Liked() {
    const { liked_songs: likedSongs, songs, albums } = musicData

    const songData = likedSongs.map(({song_id}) => songs.find(song => song.id === song_id)).filter(Boolean)

    return (
        <div className="album-wrapper">
            <Sidebar />
            <LikedSongsHero count={songData.length} />
            <SongList songData={songData} albumData={albums} />
        </div>
    )
}

export default Liked
