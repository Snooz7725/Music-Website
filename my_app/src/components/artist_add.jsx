import './artist_add.css'
import { useState } from 'react'

function ArtistAdd({openFlag, setActiveDialog, handleAddArtist}) {
    const [artistData, setArtistData] = useState({
        name: null,
        profilePic: null
    })
    const [isClosing, setIsClosing] = useState(false)

    const canSubmit = Boolean(artistData?.name && artistData?.profilePic)

    const handleCancel = () => {
        if (isClosing) return // Just in case

        setIsClosing(true)

        setTimeout(() => {
            setIsClosing(false)
            setActiveDialog('')
        }, 290)
    }

    if (openFlag || isClosing) return (
        <div className={isClosing ? "artist-add-wrapper closing" : "artist-add-wrapper"}>
            <input type="text" placeholder="Enter new artist" className="text-input" onChange={(e) => setArtistData(prev => ({
                ...prev,
                "name": e.target.value
            }))}/>
            
            <div className="btn-list">
                <button className={canSubmit ? 'btn' : 'disabled btn'} disabled={!canSubmit || isClosing} onClick={() => {
                    handleAddArtist(artistData)
                    handleCancel()
                }}>
                    <img src="/assets/white_plus.png" alt="" />
                </button>
                <button className="btn cancel-btn" disabled={isClosing} onClick={handleCancel}>
                    <img src="/assets/white_x.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default ArtistAdd