import { useState } from "react"
import "./App.css"
import Searchbar from "./components/searchbar"
import Sidebar from "./components/sidebar"

function App() {
    const [state, setState] = useState(true)

    return (
        <div className="app-wrapper">
            <Sidebar />
            <div className="right-section">
                <Searchbar />    
            </div>
        </div>
    )
}

export default App
