import { useState } from "react"
import "./App.css"
import Searchbar from "./components/searchbar"
import Sidebar from "./components/sidebar"
import Hero from "./components/hero"
import Category from "./components/category"
import CategoryCard from "./components/category_card"
import albumPlaceholder from "./assets/album_placeholder.jpg"

function App() {
    const [state, setState] = useState(true)

    return (
        <div className="app-wrapper">
            <Sidebar />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <Hero />
                    <Category title="Category">
                        <CategoryCard title="Card 1" artist="Artist 1" filePath={albumPlaceholder} />
                        <CategoryCard title="Card 2" artist="Artist 2" filePath={albumPlaceholder} />
                        <CategoryCard title="Card 1" artist="Artist 1" filePath={albumPlaceholder} />
                        <CategoryCard title="Card 2" artist="Artist 2" filePath={albumPlaceholder} />
                        <CategoryCard title="Card 1" artist="Artist 1" filePath={albumPlaceholder} />
                        <CategoryCard title="Card 2" artist="Artist 2" filePath={albumPlaceholder} />
                        <CategoryCard title="Card 1" artist="Artist 1" filePath={albumPlaceholder} />
                        <CategoryCard title="Card 2" artist="Artist 2" filePath={albumPlaceholder} />
                        <CategoryCard title="Card 1" artist="Artist 1" filePath={albumPlaceholder} />
                        <CategoryCard title="Card 2" artist="Artist 2" filePath={albumPlaceholder} />
                    </Category>
                </div>
            </div>
        </div>
    )
}

export default App
