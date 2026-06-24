import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'


function Sidebar({ likedAlbumsData, likedSongsCount }) {
    const [open, setOpen] = useState(false)
    return (
        // State/class controlled width + transition + potentially translateX for fluidity
        // Record closed sidebar width
        <nav className={open ? 'open sidebar-wrapper' : 'sidebar-wrapper'}>
            <ul className="topbar-list">
                <NavLink to="/"><li className="logo-wrapper">
                    <img src="/images/ui/logo.png" alt="Logo" />
                </li></NavLink>
                <NavLink to="/"><li className="icon-wrapper">
                    <img src="/images/ui/home_btn.png" alt="Home" />
                </li></NavLink>
                <NavLink to="/song-add"><li className="icon-wrapper search-btn">
                    <img src="/images/ui/white_plus.png" alt="Add song" />
                </li></NavLink>
            </ul>
            <ul className="btn-list">
                <li><button className="toggle-btn btn" onClick={() => setOpen(!open)}>
                    <div className="icon-wrapper">
                        <img src="/images/ui/sidebar_btn.png" alt="Sidebar" />
                    </div>
                    <div className={open ? 'open-content' : 'open-content hidden'}>
                        <h2 className="title">Liked-List</h2>
                    </div>
                </button></li>

                <li><NavLink to="/liked-songs" className="liked-btn btn">
                    <div className="icon-wrapper">
                        <img src="/images/ui/transparent_heart_btn.png" alt="Liked Songs" />
                    </div>
                    <div className={open ? 'open-content' : 'open-content hidden'}>
                        <span className="name">Liked Songs</span>
                        <span className="count">Count | {likedSongsCount}</span>
                    </div>
                </NavLink></li>

                {likedAlbumsData.map(likedAlbum => 
                    <li key={likedAlbum.id}><NavLink to={'/album/' + likedAlbum.id} className="album-btn btn">
                        <div className="icon-wrapper">
                            <img src={likedAlbum.thumbnail} alt="Album" />
                        </div>
                        <div className={open ? 'open-content' : 'open-content hidden'}>
                            <span className="name">{likedAlbum.title}</span>
                            <span className="count">Count | {likedAlbum.count}</span>
                        </div>
                    </NavLink></li>
                )}
            </ul>
        </nav>
    )
  }
  
  export default Sidebar