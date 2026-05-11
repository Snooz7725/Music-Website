import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import NoMatch from "./pages/no_match"
import Album from "./pages/album"
import LikedSongs from "./pages/liked"
import CreatorProfile from "./pages/creator_profile"
import SongAdd from "./pages/song_add"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/liked-songs" element={<LikedSongs />} />
                <Route path="/profile/:id" element={<CreatorProfile />} />
                <Route path="/song-add" element={<SongAdd />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
