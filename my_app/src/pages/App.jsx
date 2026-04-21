import "./App.css"
import Searchbar from "../components/searchbar"
import Sidebar from "../components/sidebar"
import Hero from "../components/hero"
import Category from "../components/category"
import CategoryCard from "../components/category_card"
import albumPlaceholder from "../assets/album_placeholder.jpg"
import musicData from "../data/db.json"

function App() {
    const { albums, songs } = musicData

    return (
        <div className="app-wrapper">
            <Sidebar />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <Hero />
                    <Category title="Songs">
                        {songs.map((song) => (
                            <CategoryCard
                                id={song.id}
                                title={song.title}
                                artist={song.artist}
                                filePath={song.thumbnail}
                            />
                        ))}
                    </Category>

                    <Category title="Albums">
                        {albums.map((album) => (
                            <CategoryCard
                                id={album.id}
                                title={album.title}
                                artist={album.artist}
                                filePath={album.thumbnail}
                            />
                        ))}
                    </Category>
                </div>
            </div>
        </div>
    )
}

export default App
