import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
import logo from "./../assets/logo.png"
import sidebarIcon from "./../assets/black_sidebar.png"
import likedIcon from "./../assets/transparent_heart.png"
import albumIcon from "./../assets/album_placeholder.jpg"
import homeIcon from "./../assets/black_home.png"
import searchIcon from "./../assets/search.png"

function Sidebar() {
    const [open, setOpen] = useState(false)

    return (
        // State/class controlled width + transition + potentially translateX for fluidity
        // Record closed sidebar width
        <nav className={open ? "open sidebar-wrapper" : "sidebar-wrapper"}>
            <ul className="topbar-list">
                <NavLink to="/"><li className="logo-wrapper">
                    <img src={logo} alt="Logo" />
                </li></NavLink>
                <NavLink to="/"><li className="icon-wrapper">
                    <img src={homeIcon} alt="Home" />
                </li></NavLink>
                <NavLink to="/test"><li className="icon-wrapper search-btn">
                    <img src={searchIcon} alt="Search" />
                </li></NavLink>
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

                <li><NavLink to="/liked" className="liked-btn btn">
                    <div className="icon-wrapper">
                        <img src={likedIcon} alt="Liked Songs" />
                    </div>
                    <div className={open ? "open-content" : "open-content hidden"}>
                        <span className="name">Liked Songs</span>
                        <span className="count">Count: <span>90</span></span>
                    </div>
                </NavLink></li>

                <li><NavLink to="/album/1" className="album-btn btn">
                    <div className="icon-wrapper">
                        <img src={albumIcon} alt="Album" />
                    </div>
                    <div className={open ? "open-content" : "open-content hidden"}>
                        <span className="name">Album</span>
                        <span className="count">Count: <span>90</span></span>
                    </div>
                </NavLink></li>
            </ul>
        </nav>
    )
  }
  
  export default Sidebar