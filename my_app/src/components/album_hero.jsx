import { useState } from "react"
import FormatBtn from "./format_btn"
import LikeBtn from "./like_btn"
import albumPlaceholder from "../assets/album_placeholder.jpg"
import "./album_hero.css"

function AlbumHero({ title, artist, releaseDate, count }) {
    return (
        <div className="album-hero-wrapper">
            <div className="top-section">
                <div className="img-wrapper">
                    <img src={albumPlaceholder} alt="Album Cover"/>
                </div>
                <div className="album-info">
                    <h1>{title}</h1>
                    <p>{artist}</p>
                    <p>Release Date: {releaseDate}</p>
                    <p>Count: {count}</p>
                </div>
            </div>
            <ul className="btn-list">
                <FormatBtn />
                <LikeBtn />
            </ul>
        </div>
    )
}

export default AlbumHero