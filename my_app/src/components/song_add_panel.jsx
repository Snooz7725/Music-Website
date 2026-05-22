import './song_add_panel.css'
import { useState } from "react"

function SongAddPanel() {
    async function handleInfoScrape() {
        const artist = "Kendrick Lamar"
        const res = await fetch(
            `https://musicbrainz.org/ws/2/artist/?query=artist:${artist}&fmt=json`,
            {
                headers: {
                    "User-Agent": "MyApp/1.0 (me@example.com)"
                }
            }
        )

        const data = await res.json()
        console.log("data: \n" + JSON.stringify(data, null, 2))
        const id = data.artists[0].id

        const res2 = await fetch(
            `https://musicbrainz.org/ws/2/artist/${id}?fmt=json`,
            {
                headers: {
                    "User-Agent": "MyApp/1.0 (me@example.com)"
                }
            }
        )
        
        const data2 = await res2.json()
        console.log("data2:\n" + JSON.stringify(data2, null, 2))

        // setArtist(data2)
    }

    const [ btnState, setBtnState ] = useState(true)
    const [ artist, setArtist ] = useState(true)

    return (
        <div className="song-add-panel-wrapper">
            <div className="hero">
                <img src="./assets/drummer.jpg" alt=""/>
                <span>Looking For Something?</span>
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder='Enter artist'/>
                <input type="text" placeholder="Enter song/album"/>
                <div className='button-wrapper'>
                    <button className={ btnState ? "album selected" : "album" } onClick={() => 
                        // Stores the current state in "prev", and queues the function to change the state following a rerender
                        setBtnState(prev => !prev) 
                    }>Album</button>
                    <button className={ btnState ? "song" : "song selected" } onClick={() => 
                        setBtnState(prev => !prev) 
                    }>Song</button>
                </div>
            </div>
            <hr></hr>
            <button className="search-btn" onClick={ () => handleInfoScrape() }>
                <img src="/assets/search_btn.png" alt="" />
            </button>
        </div>
    )
};

export default SongAddPanel