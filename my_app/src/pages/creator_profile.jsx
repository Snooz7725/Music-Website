import "./creator_profile.css"
import Searchbar from "../components/searchbar"
import Sidebar from "../components/sidebar"
import CreatorHero from "../components/creator_hero"
import Category from "../components/category"
import AlbumCategoryCard from "../components/album_category_card"
import SongCategoryCard from "../components/song_category_card"
import musicData from "../data/db.json"

function CreatorProfile() {
    const { albums, songs, artists } = musicData
    const albumMap = Object.fromEntries(albums.map(album => [album.id, album]))
    const artistMap = Object.fromEntries(artists.map(artist => [artist.id, artist]))

    return (
        <div className="creator-profile-wrapper">
            <Sidebar />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <CreatorHero />
                    <Category title="Songs">
                        {songs.map((song) => (
                            <SongCategoryCard
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
                        {albums.map((album) => (
                            <AlbumCategoryCard
                                albumId={album.id}
                                albumTitle={album.title}
                                artist={artistMap[album.artist_id].name}
                                artistId={album.artist_id}
                                filePath={album.thumbnail}
                            />
                        ))}
                    </Category>
                </div>
            </div>
        </div>
    )
}

export default CreatorProfile
