import { useState } from 'react'
import './sidebar.css'
import logo from "./../assets/logo.png"
import sidebarIcon from "./../assets/black_sidebar.png"
import likedIcon from "./../assets/transparent_heart.png"
import albumIcon from "./../assets/album_placeholder.jpg"
import homeIcon from "./../assets/black_home.png"
import searchIcon from "./../assets/search.png"

function Sidebar() {
    const [open, setOpen] = useState(true)

    return (
        // State/class controlled width + transition + potentially translateX for fluidity
        // Record closed sidebar width
        <nav className={open ? "open sidebar" : "closed sidebar"}>
            <div className="logo-wrapper">
                <img src="" alt="Logo" />
            </div>
            <ul className="btn-list">
                <li><button className="toggle-btn btn" onClick={() => setOpen(!open)}>
                    <div className="icon-wrapper">
                        <img src={sidebarIcon} alt="Sidebar" />
                    </div>
                    <div className={open ? "open-content" : "open-content hidden"}>
                        <h2 className="title">Liked-List</h2>
                    </div>
                </button></li>

                <li><a className="liked-btn btn">
                    <div className="icon-wrapper">
                        <img src={likedIcon} alt="Liked Songs" />
                    </div>
                    <div className={open ? "open-content" : "open-content hidden"}>
                        <span className="name">Liked Songs</span>
                        <span className="count">Count:<span></span></span>
                    </div>
                </a></li>
            </ul>
        </nav>
    )
  }
  
  export default Sidebar