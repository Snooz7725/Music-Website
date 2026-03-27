import { useState } from 'react'
import './sidebar.css'
import logo from "./../assets/logo.png"
import sidebarIcon from "./../assets/black_sidebar.png"
import likedIcon from "./../assets/transparent_heart.png"
import albumIcon from "./../assets/album_placeholder.jpg"
import homeIcon from "./../assets/black_home.png"
import searchIcon from "./../assets/search.png"

function Sidebar() {
    const [state, setState] = useState(true)

    return (
        <>
            {state ? (
                <div className="closed-sidebar-wrapper">
                    <div className="content-wrapper">
                        <div className="logo-wrapper">
                            <img src={logo} alt="Logo" />
                        </div>
                        <ul className="liked-list">
                            <li><button className="toggle-btn" onClick={() => setState(!state)}>
                                <img src={sidebarIcon} alt="Sidebar button" />
                            </button></li>
                            <li><button className="liked-songs">
                                <img src={likedIcon} alt="Liked songs" />
                            </button></li>
                            <li><hr className="liked-list-divider"></hr></li>
                            <li><button className="liked-albums">
                                <img src={albumIcon} alt="Liked songs" />
                            </button></li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="open-sidebar-wrapper">
                    <div className="content-wrapper">
                        <div className="top-bar">
                            <div className="logo-wrapper">
                                <img src={logo} alt="Logo" />
                            </div>
                            <button className="icon-wrapper search-btn">
                                <img src={homeIcon} alt="Search navigation button" />
                            </button>
                            <button className="icon-wrapper home-btn">
                                <img src={searchIcon} alt="Home navigation button" />
                            </button>
                        </div>
                        
                        <ul className="liked-list">
                            <li><div className="toggle-group">
                                <button className="toggle-btn" onClick={() => setState(!state)} alt="Sidebar toggle">
                                    <img src={sidebarIcon} alt="Sidebar toggle" />
                                </button>
                                <h1>Liked songs & albums</h1>
                            </div></li>
                            <li><div className="liked-songs-group">
                                <button className="liked-songs" alt="Liked songs playlist">
                                    <img src={likedIcon} alt="Liked songs playlist" />
                                </button>
                                <div className="description">
                                    <h2>Liked-songs</h2>
                                    <span>Count:<span className="liked-songs-count"></span></span>
                                </div>
                            </div></li>
                            <li><hr className="liked-list-divider"></hr></li>
                            <li><div className="liked-albums-group">
                                <button className="liked-albums" alt="A liked album">
                                    <img src={albumIcon} alt="Liked songs" />
                                </button>
                                <div className="description">
                                    <h2>Placeholder</h2>
                                    <span>Count:<span className="liked-songs-count"></span></span>
                                </div>
                            </div></li>
                        </ul>
                    </div>
                </div>
            )}
        </>  
    )
  }
  
  export default Sidebar