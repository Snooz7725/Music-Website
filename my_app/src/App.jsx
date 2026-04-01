import { useState } from "react"
import "./App.css"
import Searchbar from "./components/searchbar"
import Sidebar from "./components/sidebar"
import Hero from "./components/hero"

function App() {
    const [state, setState] = useState(true)

    return (
        <div className="app-wrapper">
            <Sidebar />
            <div className="main-section">
                <Searchbar />
                <Hero />
            </div>
        </div>
    )
}

export default App
