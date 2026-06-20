import './artist_add.css'
import { useState } from 'react'

function ArtistAdd({openFlag, setActiveDialog}) {
    const [newArtistData, setNewArtistData] = useState({})
    const isBtnDisabled = newArtistData?.name ? true : false

    if (openFlag) return (
        <div className="artist-add-wrapper">
            <div className="input-wrapper">
                <input type="text" placeholder="Enter artist" className="text-input" onChange={(e) => setNewArtistData(prev => ({
                    ...prev,
                    "name": e.target.value
                }))}/>
                <div className="btn-list">
                    <button className={ isBtnDisabled ? 'btn' : 'disabled btn'} disabled={ !isBtnDisabled }>
                        <img src="/assets/white_plus.png" alt="" />
                    </button>
                    <button className="btn cancel-btn" disabled={ !isBtnDisabled } onClick={() => setActiveDialog('')}>
                        <img src="/assets/white_x.png" alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ArtistAdd