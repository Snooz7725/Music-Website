import './song_add_panel.css'
import { useContext, useState, useEffect } from "react";
import { DialogContext } from "../provider/dialog_context";
import ArtistAdd from './artist_add'
import AlbumAdd from './album_add'

function SongAddPanel({refetch, handleAddNewSong, handleAddArtist, handleAddAlbum, data}) {
    const { activeDialog, setActiveDialog } = useContext(DialogContext);

    const [ albumInputCheckbox, setAlbumInputCheckbox ] = useState(false)
    const [newSongData, setNewSongData] = useState({
        artistName: '',
        songName: '',
        albumName: '',
        thumbnailData: ''
    })

    const addBtn = newSongData.songName.trim() !== ''
        && newSongData.artistName.trim() !== ''
        && ((!albumInputCheckbox) || newSongData.albumName.trim() !== '')

    const [ thumbnailInputCheckbox, setThumbnailInputCheckbox ] = useState(false)
    const [ pasteFlag, setPasteFlag ] = useState(false)
    const [ imgURL, setImgURL ] = useState('')
    const [ btnToggleFlag, setBtnToggleFlag ] = useState(false)

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

                        setNewSongData(prev => ({
                            ...prev,
                            thumbnailData: blob
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
    
    return (
        <div className="song-add-panel-wrapper">
            <ArtistAdd openFlag={activeDialog === 'artistDialog'} setActiveDialog={setActiveDialog} handleAddArtist={handleAddArtist} refetch={refetch} />
            <AlbumAdd openFlag={activeDialog === 'albumDialog'} setActiveDialog={setActiveDialog} handleAddAlbum={handleAddAlbum} refetch={refetch} data={data} />

            <div className="hero">
                <img src="/images/ui/microphone.jpg" alt=""/>
                <span>Wanna Add A New Song?</span>
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter song" className="text-input" onChange={(e) => setNewSongData(prev => ({
                    ...prev,
                    "songName": e.target.value
                }))}/>
                <hr/>
                
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
                    <input type="text" placeholder="Enter album" list="albumInput" className={ albumInputCheckbox ? 'text-input' : 'disabled text-input'} disabled={ !albumInputCheckbox } onChange={(e) => setNewSongData(prev => ({
                        ...prev,
                        "albumName": e.target.value
                    }))}/>
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
                    { newSongData.thumbnailData == '' ? (
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
                            <button className="btn cancel-thumbnail-btn" onClick={() => setNewSongData(prev => ({
                                ...prev,
                                "thumbnailData": ''
                            }))}>
                                <img src="/images/ui/white_closed_bin.png" alt="delete" />
                            </button>
                        </>
                    )}
                </div>
            </div>
            <hr className="main-hr"/>
            <div className="btn-list">
                <button className={ addBtn ? 'btn' : 'disabled btn'} disabled={ !addBtn } onClick={() => handleAddNewSong()}>
                    <img src="/images/ui/white_plus.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default SongAddPanel
