import Sidebar from "../components/sidebar"
import "./album.css"
import LikedSongsHero from "../components/liked_hero"
import SongList from "../components/song_list"
import musicData from "../data/db.json"

function Liked() {
    const { songs, liked_songs, albums, artists } = musicData

    // if any [subject] has a specified [subject] then keep it, else filter it out 
    const songData = songs.filter(song => liked_songs.some(likedSong => likedSong.song_id === song.id))
    const artistData = artists.filter(artist => songData.some(song => song.artist_id === artist.id))
    const albumData = albums.filter(album => songData.some(song => song.album_id === album.id))

    return (
        <div className="album-wrapper">
            <Sidebar />
            <LikedSongsHero count={songData.length} />
            <SongList songData={songData} albumData={albumData} artistData={artistData}/>
        </div>
    )
}

export default Liked
