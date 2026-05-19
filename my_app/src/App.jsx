import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import NoMatch from "./pages/no_match"
import Album from "./pages/album"
import LikedSongs from "./pages/liked"
import CreatorProfile from "./pages/creator_profile"
import SongAdd from "./pages/song_add"

function App() {
    console.log(new Date().toString())

    return (
        // Manages routing, including:
        // - watches browser URL
        // - listens for navigation
        // - stores routing state 
        // - exposes routing context to all underneath
        <BrowserRouter>
            {/* This maps URLs to components, rendering pages */}
            {/* http://localhost:5173/album/0 */}
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