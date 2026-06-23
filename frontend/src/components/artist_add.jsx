import './artist_add.css'
import { useState, useEffect } from 'react'

function ArtistAdd({openFlag, setActiveDialog, handleAddArtist}) {
    const [artistData, setArtistData] = useState({
        name: null,
        blob: null
    })
    const [isClosing, setIsClosing] = useState(false)

    const handleCancel = () => {
        if (isClosing) return // Just in case

        setIsClosing(true)

        setTimeout(() => {
            setIsClosing(false)
            setArtistData({
                name: null,
                blob: null
            })
            setActiveDialog('')
        }, 290)
    }

    const [ thumbnailInputCheckbox, setThumbnailInputCheckbox ] = useState(false)
    const [ pasteFlag, setPasteFlag ] = useState(false)
    const [ imgURL, setImgURL ] = useState('')
    const [ btnToggleFlag, setBtnToggleFlag ] = useState(false)

    const canSubmit = Boolean(artistData.name && (thumbnailInputCheckbox === (artistData.blob !== null)))

    useEffect(() => {
        function handlePaste(e) {
            if (!pasteFlag || !thumbnailInputCheckbox || !btnToggleFlag) return

            setPasteFlag(false)
            setBtnToggleFlag(false)

            try {
                const items = e.clipboardData?.items
                if (!items) throw new Error('Clipboard Read Error')

                for (const item of items) {
                    if (item.type.startsWith('image/')) {
                        const blob = item.getAsFile()
                        setArtistData(prev => ({
                            ...prev,
                            blob
                        }))
                        if (!blob) continue

                        setImgURL(prevUrl => {
                            if (prevUrl) URL.revokeObjectURL(prevUrl)
                            return URL.createObjectURL(blob)
                        })

                        break
                    }
                }
            } catch (error) {
                console.error('Paste failed:', error)
            }
        }

        document.addEventListener('paste', handlePaste)

        return () => {
            document.removeEventListener('paste', handlePaste)
        }
    }, [pasteFlag, thumbnailInputCheckbox, btnToggleFlag])

    if (openFlag || isClosing) return (
        <div className={isClosing ? "artist-add-wrapper closing" : "artist-add-wrapper"}>
            <input type="text" placeholder="Enter new artist" className="text-input" onChange={(e) => setArtistData(prev => ({
                ...prev,
                "name": e.target.value
            }))}/>

            <div className="thumbnail-input">
                <button className={ thumbnailInputCheckbox ? "active checkbox" : "checkbox"} onClick={() => setThumbnailInputCheckbox(prev => !prev)}></button>
                <label className="details">Add profile picture</label>
            </div>
            <div className="thumbnail-output">
                { artistData.blob === null ? (
                    <button
                        className={
                            thumbnailInputCheckbox && !btnToggleFlag ? "btn paste-thumbnail-btn"
                            : thumbnailInputCheckbox && btnToggleFlag ? "btn paste-thumbnail-btn toggled"
                            : "btn paste-thumbnail-btn disabled"
                        }
                        disabled={!thumbnailInputCheckbox}
                        onClick={() => {
                            setPasteFlag(true)
                            setBtnToggleFlag(true)
                        }}
                    >
                        <img src="./assets/white_paste.png" alt="paste" />
                    </button>
                ) : (
                    <>
                        <span className="details">Pasted image:</span>
                        <div className="img-wrapper">
                            <img src={ imgURL }></img>
                        </div>
                        <button className="btn cancel-thumbnail-btn" onClick={() => setArtistData(prev => ({
                            ...prev,
                            blob: null
                        }))}>
                            <img src="./assets/white_closed_bin.png" alt="delete" />
                        </button>
                    </>
                )}
            </div>
            
            <div className="btn-list">
                <button className={(canSubmit && !isClosing) ? 'btn' : 'disabled btn'} disabled={!canSubmit || isClosing} onClick={() => {
                    handleAddArtist(artistData, thumbnailInputCheckbox)
                    handleCancel()
                }}>
                    <img src="/assets/white_plus.png" alt="" />
                </button>
                <button className="btn cancel-btn" disabled={isClosing} onClick={() => {
                    handleCancel()
                }}>
                    <img src="/assets/white_x.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default ArtistAdd