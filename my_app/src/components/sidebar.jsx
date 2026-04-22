import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'


function Sidebar() {
    const [open, setOpen] = useState(false)

    return (
        // State/class controlled width + transition + potentially translateX for fluidity
        // Record closed sidebar width
        <nav className={open ? "open sidebar-wrapper" : "sidebar-wrapper"}>
            <ul className="topbar-list">
                <NavLink to="/"><li className="logo-wrapper">
                    <img src="/assets/logo.png" alt="Logo" />
                </li></NavLink>
                <NavLink to="/"><li className="icon-wrapper">
                    <img src="/assets/home_btn.png" alt="Home" />
                </li></NavLink>
                <NavLink to="/test"><li className="icon-wrapper search-btn">
                    <img src="/assets/search_btn.png" alt="Search" />
                </li></NavLink>
            </ul>
            <ul className="btn-list">
                <li><button className="toggle-btn btn" onClick={() => setOpen(!open)}>
                    <div className="icon-wrapper">
                        <img src="/assets/sidebar_btn.png" alt="Sidebar" />
                    </div>
                    <div className={open ? "open-content" : "open-content hidden"}>
                        <h2 className="title">Liked-List</h2>
                    </div>
                </button></li>

                <li><NavLink to="/liked" className="liked-btn btn">
                    <div className="icon-wrapper">
                        <img src="/assets/transparent_heart_btn.png" alt="Liked Songs" />
                    </div>
                    <div className={open ? "open-content" : "open-content hidden"}>
                        <span className="name">Liked Songs</span>
                        <span className="count">Count: <span>90</span></span>
                    </div>
                </NavLink></li>

                <li><NavLink to="/album/1" className="album-btn btn">
                    <div className="icon-wrapper">
                        <img src="/assets/album_placeholder.jpg" alt="Album" />
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