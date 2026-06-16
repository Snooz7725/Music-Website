import './song_add_panel.css'
import { useState } from "react"

function SongAddPanel() {
    async function handleAddNewSong() {}

    const [ newSongData, setnewSongData ] = useState({
        artistName: '',
        songName: '',
        albumName: '',
        thumbnailData: ''
    })

    const [ albumCheckbox, setAlbumCheckbox ] = useState(false)
    const [ thumbnailCheckbox, setThumbnailCheckbox ] = useState(false)
    const [ pasteFlag, setPasteFlag ] = useState(false)
    const [ imgURL, setImgURL ] = useState('')
    const [ toggleFlag, setToggleFlag ] = useState(false)

    const addBtn =
        newSongData.songName.trim() !== ''
        && newSongData.artistName.trim() !== ''
        && ((!albumCheckbox) || newSongData.albumName.trim() !== '')

    document.addEventListener('paste', async (e) => {
        // pasteFlag is for checking if the checkbox for thumbnails is selected
        // toggleFlag + thumbnailCheckbox is for preventing paste spamming by making it paste-per-click 
        // (holding the button continuously fires off the event)
        if (!pasteFlag || !thumbnailCheckbox || !toggleFlag) return
        setPasteFlag(false)
        setToggleFlag(false)

        console.log('Paste detected')

        try {
            // Check if anything retrieved and pasteFlag true
            const items = e.clipboardData?.items;
            if (!items) throw new Error(`Clipboard Read Error`)

            for (const item of items) {
                if (item.type.startsWith('image/')) {
                    console.log('image/ found')
                    const blob = item.getAsFile();
                    // getAsFile() fails silently
                    if (!blob) continue;
                    setnewSongData(prev => ({ 
                        ...prev, 
                        thumbnailData: blob 
                    }))

                    setImgURL(URL.createObjectURL(blob))
                }
            }

            console.log('Paste successful')
        } catch (error) {
            console.error('Paste failed:', error)
        }
    })
    
    return (
        <div className="song-add-panel-wrapper">
            <div className="hero">
                <img src="./assets/microphone.jpg" alt=""/>
                <span>Looking For Something?</span>
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter artist" className="text-input" onChange={(e) => setnewSongData(prev => ({
                    ...prev,
                    "artistName": e.target.value
                }))}/>
                <input type="text" placeholder="Enter song" className="text-input" onChange={(e) => setnewSongData(prev => ({
                    ...prev,
                    "songName": e.target.value
                }))}/>
                <hr/>
                <div className="album-input">
                    <button className={ albumCheckbox ? "active checkbox" : "checkbox"} onClick={() => setAlbumCheckbox(prev => !prev)}></button>
                    <label className="details">Create an album/Add song to an existing album</label>
                </div>
                <input type="text" placeholder="Enter album" className={ albumCheckbox ? 'text-input' : 'disabled text-input'} disabled={ !albumCheckbox } onChange={(e) => setnewSongData(prev => ({
                    ...prev,
                    "albumName": e.target.value
                }))}/>
                <hr/>
                <div className="thumbnail-input">
                    <button className={ thumbnailCheckbox ? "active checkbox" : "checkbox"} onClick={() => setThumbnailCheckbox(prev => !prev)}></button>
                    <label className="details">Add thumbnail</label>
                </div>
                <div className="thumbnail-output">
                    { newSongData.thumbnailData == '' ? (
                        <button className={ 
                            thumbnailCheckbox && !toggleFlag ? "btn paste-thumbnail-btn"
                            : thumbnailCheckbox && toggleFlag ? "btn paste-thumbnail-btn toggled"
                            : "btn paste-thumbnail-btn disabled"

                        } onClick={() => {
                            setPasteFlag(true)
                            setToggleFlag(true)
                        }}>
                            <img src="./assets/white_paste.png"></img>
                        </button>
                    ) : (
                        <>
                            <span className="details">Pasted image:</span>
                            <div className="img-wrapper">
                                <img src={ imgURL }></img>
                            </div>
                            <button className="btn cancel-thumbnail-btn" onClick={() => setnewSongData(prev => ({
                                ...prev,
                                "thumbnailData": ''
                            }))}>
                                <img src="./assets/white_closed_bin.png" alt="delete" />
                            </button>
                        </>
                    )}
                </div>
            </div>
            <hr className="main-hr"/>
                <button className={ addBtn ? 'btn' : 'disabled btn'} disabled={ !addBtn } onClick={() => handleAddNewSong}>
                    <img src="/assets/white_plus.png" alt="" />
                </button>
        </div>
    )
};

export default SongAddPanel
