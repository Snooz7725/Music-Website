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
            <ul className="topbar-list">
                <li className="logo-wrapper">
                    <img src={logo} alt="Logo" />
                </li>
                <li className="icon-wrapper">
                    <img src={homeIcon} alt="Home" />
                </li>
                <li className="icon-wrapper">
                    <img src={searchIcon} alt="Search" />
                </li>
            </ul>
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
                        <span className="count">Count: <span>90</span></span>
                    </div>
                </a></li>

                <li><a className="album-btn btn">
                    <div className="icon-wrapper">
                        <img src={albumIcon} alt="Album" />
                    </div>
                    <div className={open ? "open-content" : "open-content hidden"}>
                        <span className="name">Album</span>
                        <span className="count">Count: <span>90</span></span>
                    </div>
                </a></li>
            </ul>
        </nav>
    )
  }
  
  export default Sidebar