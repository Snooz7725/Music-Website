import { useContext, useState, useEffect, useRef } from "react";
import { DialogContext } from "../provider/dialog_context";

import ArtistAdd from './artist_add'
import AlbumAdd from './album_add'

import './song_add_panel.css'

function SongAddPanel({refetch, handleAddSong, handleAddArtist, handleAddAlbum, data}) {
    const { activeDialog, setActiveDialog } = useContext(DialogContext);

    const [ albumInputCheckbox, setAlbumInputCheckbox ] = useState(false)

    const [artistName, setArtistName] = useState(null)
    const [albumTitle, setAlbumTitle] = useState(null)

    const [songData, setSongData] = useState({
        title: null,
        albumId: null,
        artistId: null,
        blob: null
    })

    const [ thumbnailInputCheckbox, setThumbnailInputCheckbox ] = useState(false)
    const [ pasteFlag, setPasteFlag ] = useState(false)
    const [ imgURL, setImgURL ] = useState('')
    const [ btnToggleFlag, setBtnToggleFlag ] = useState(false)

    const songTitleInputRef = useRef(null)
    const artistInputRef = useRef(null)
    const albumInputRef = useRef(null)

    useEffect(() => handleDebArtistId(data?.data?.artists?.data, artistName), [artistName, data])

    useEffect(() => handleDebAlbumId(data?.data?.albums?.data, albumTitle), [albumTitle, data])

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
                        if (!blob) continue

                        setSongData(prev => ({
                            ...prev,
                            blob
                        }))

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

    const canSubmit = Boolean(
        songData.title && 
        Number.isInteger(songData.artistId) && 
        (albumInputCheckbox === Number.isInteger(songData.albumId)) && 
        (thumbnailInputCheckbox === (songData.blob !== null))
    )

    function handleDebArtistId(artists, name) {
        setTimeout(() => {
            // Inevitably returns undefined
            const artist = artists?.find(artist => artist.name?.toLowerCase() === name?.toLowerCase())
            setSongData(prev => ({
                ...prev, 
                artistId: artist?.id ?? null
            }))
        }, 290)
    }

    function handleDebAlbumId(albums, title) {
        setTimeout(() => {
            // Inevitably returns undefined
            const album = albums?.find(album => album.title?.toLowerCase() === title?.toLowerCase())
            setSongData(prev => ({
                ...prev, 
                albumId: album?.id ?? null
            }))
        }, 290)
    }

    function resetForm() {
        if (imgURL) {
            URL.revokeObjectURL(imgURL)
        }

        setAlbumInputCheckbox(false)
        setArtistName(null)
        setAlbumTitle(null)
        setSongData({
            title: null,
            albumId: null,
            artistId: null,
            blob: null
        })
        
        setThumbnailInputCheckbox(false)
        setPasteFlag(false)
        setImgURL('')
        setBtnToggleFlag(false)

        if (songTitleInputRef.current) {
            songTitleInputRef.current.value = ''
        }
        if (artistInputRef.current) {
            artistInputRef.current.value = ''
        }
        if (albumInputRef.current) {
            albumInputRef.current.value = ''
        }
    }
    
    return (
        <div className="song-add-panel-wrapper">
            <ArtistAdd openFlag={activeDialog === 'artistDialog'} setActiveDialog={setActiveDialog} handleAddArtist={handleAddArtist} refetch={refetch} />
            <AlbumAdd openFlag={activeDialog === 'albumDialog'} setActiveDialog={setActiveDialog} handleAddAlbum={handleAddAlbum} refetch={refetch} data={data} />

            <div className="hero">
                <img src="/images/ui/microphone.jpg" alt=""/>
                <span>Wanna Add A New Song?</span>
            </div>
            <div className="input-wrapper">
                <input ref={songTitleInputRef} type="text" placeholder="Enter song" className="text-input" onChange={(e) => setSongData(prev => ({
                    ...prev,
                    "title": e.target.value
                }))}/>
                <hr/>
                
                <div className="artist-input-wrapper">
                    <input ref={artistInputRef} type="text" placeholder="Enter artist" list="artistInput" className="text-input" onChange={(e) => setArtistName(e.target.value)}/>
                    <datalist id="artistInput">
                        {data?.data?.artists?.data?.map(artist =>
                            <option 
                                key={artist.id} 
                                value={artist.name} 
                                data-id={artist.id} 
                            />
                        )}
                    </datalist>
                    <button className="btn add-btn" onClick={() => setActiveDialog('artistDialog')}>
                        <img src="/images/ui/white_plus.png" alt="Add artist" />
                    </button>
                </div>
                <hr/>

                <div className="album-input">
                    <button className={ albumInputCheckbox ? "active checkbox" : "checkbox"} onClick={() => setAlbumInputCheckbox(prev => !prev)}></button>
                    <label className="details">Add song to an existing album</label>
                </div>
                <div className="album-input-wrapper">
                    <input ref={albumInputRef} type="text" placeholder="Enter album" list="albumInput" className={ albumInputCheckbox ? 'text-input' : 'disabled text-input'} disabled={ !albumInputCheckbox } onChange={(e) => setAlbumTitle(e.target.value)}/>
                    <datalist id="albumInput">
                        {data?.data?.albums?.data?.map(album =>
                            <option 
                                key={album.id} 
                                value={album.title} 
                                data-id={album.id} 
                            />
                        )}
                    </datalist>
                    <button className="btn add-btn" onClick={() => setActiveDialog('albumDialog')}>
                        <img src="/images/ui/white_plus.png" alt="Add artist" />
                    </button>
                </div>
                <hr/>

                <div className="thumbnail-input">
                    <button className={ thumbnailInputCheckbox ? "active checkbox" : "checkbox"} onClick={() => setThumbnailInputCheckbox(prev => !prev)}></button>
                    <label className="details">Add thumbnail</label>
                </div>
                <div className="thumbnail-output">
                    { songData.blob === null ? (
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
                            <button className="btn cancel-thumbnail-btn" onClick={() => setSongData(prev => ({
                                ...prev,
                                blob: null
                            }))}>
                                <img src="/images/ui/white_closed_bin.png" alt="delete" />
                            </button>
                        </>
                    )}
                </div>
            </div>
            <hr className="main-hr"/>
            <div className="btn-list">
                <button className={ canSubmit ? 'btn' : 'disabled btn'} disabled={ !canSubmit } onClick={() => {
                    handleAddSong(songData, thumbnailInputCheckbox)
                    resetForm()
                    refetch()
                }}>
                    <img src="/images/ui/white_plus.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default SongAddPanel
