import './song_add_panel.css'
import { useState } from "react"

function SongAddPanel() {
    async function handleInfoScrape() {
        // Search using BOTH artist + recording name
        let res = await fetch(
            '/api/data?type=addSong',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    data: {
                        artistName: searchData.artistName,
                        songName: searchData.songName
                    }
                })
            }
        );
        
        try {
            res = await res.json()
        } catch (error) {
            res = {
                cause: error.cause,
                message: error.message
            }
        }
        
        console.log(JSON.stringify(res, null, 2))
    }

    const [ searchData, setSearchData ] = useState({
        artistName: "",
        songName: ""
    })

    return (
        <div className="song-add-panel-wrapper">
            <div className="hero">
                <img src="./assets/drummer.jpg" alt=""/>
                <span>Looking For Something?</span>
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder='Enter artist'onChange={(e) => setSearchData(prev => ({
                    ...prev,
                    "artistName": e.target.value
                }))}/>
                <input type="text" placeholder="Enter song" onChange={(e) => setSearchData(prev => ({
                    ...prev,
                    "songName": e.target.value
                }))}/>
            </div>
            <hr></hr>
            { searchData.artistName.trim() !== "" && searchData.songName.trim() !== "" ? (
                <button className="search-btn" onClick={ () => handleInfoScrape()}>
                    <img src="/assets/search_btn.png" alt="" />
                </button>
            ) : (
                <button className="disabled search-btn">
                    <img src="/assets/search_btn.png" alt="" />
                </button>
            )}
            
        </div>
    )
};

export default SongAddPanel