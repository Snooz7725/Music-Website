import './album_add.css'
import { useState, useEffect } from 'react'

function AlbumAdd({openFlag, setActiveDialog, handleAddAlbum, refetch, data}) {
    const [albumData, setAlbumData] = useState({
        title: null,
        blob: null
    })
    const [isClosing, setIsClosing] = useState(false)

    const handleCancel = (reload = false) => {
        if (isClosing) return // Just in case

        setIsClosing(true)

        setTimeout(() => {
            if (reload) {
                refetch()
            }

            setIsClosing(false)
            setAlbumData({
                title: null,
                blob: null
            })
            setActiveDialog('')
        }, 290)
    }

    const [ thumbnailInputCheckbox, setThumbnailInputCheckbox ] = useState(false)
    const [ pasteFlag, setPasteFlag ] = useState(false)
    const [ imgURL, setImgURL ] = useState('')
    const [ btnToggleFlag, setBtnToggleFlag ] = useState(false)

    const canSubmit = Boolean(albumData.title && (thumbnailInputCheckbox === (albumData.blob !== null)))

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
                        setAlbumData(prev => ({
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
        <div className={isClosing ? "album-add-wrapper closing" : "album-add-wrapper"}>
            <input type="text" placeholder="Enter new album" className="text-input" onChange={(e) => setAlbumData(prev => ({
                ...prev,
                "title": e.target.value
            }))}/>

            <div className="artist-input-wrapper">
                <input type="text" placeholder="Enter artist" list="artistInput" className="text-input" onChange={(e) => setNewSongData(prev => ({
                    ...prev,
                    "artistName": e.target.value
                }))}/>
                <datalist id="artistInput">
                    {data?.data?.artists?.data?.map(artist =>
                        <option 
                            key={artist.id} 
                            value={artist.name} 
                            data-id={artist.id} 
                        />
                    )}
                </datalist>
            </div>

            <div className="thumbnail-input">
                <button className={ thumbnailInputCheckbox ? "active checkbox" : "checkbox"} onClick={() => setThumbnailInputCheckbox(prev => !prev)}></button>
                <label className="details">Add thumbnail</label>
            </div>
            <div className="thumbnail-output">
                { albumData.blob === null ? (
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
                        <img src="/images/ui/white_paste.png" alt="paste" />
                    </button>
                ) : (
                    <>
                        <span className="details">Pasted image:</span>
                        <div className="img-wrapper">
                            <img src={ imgURL }></img>
                        </div>
                        <button className="btn cancel-thumbnail-btn" onClick={() => setAlbumData(prev => ({
                            ...prev,
                            blob: null
                        }))}>
                            <img src="/images/ui/white_closed_bin.png" alt="delete" />
                        </button>
                    </>
                )}
            </div>
            
            <div className="btn-list">
                <button className={(canSubmit && !isClosing) ? 'btn' : 'disabled btn'} disabled={!canSubmit || isClosing} onClick={() => {
                    handleAddAlbum(albumData, thumbnailInputCheckbox)
                    handleCancel(true)
                }}>
                    <img src="/images/ui/white_plus.png" alt="" />
                </button>
                <button className="btn cancel-btn" disabled={isClosing} onClick={() => {
                    handleCancel()
                }}>
                    <img src="/images/ui/white_x.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default AlbumAdd