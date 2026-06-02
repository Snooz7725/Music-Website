import './song_add_panel.css'
import { useState } from "react"

function SongAddPanel() {
    async function handleSongAdd(artistName, songName, albumName, albumNameFlag) {
        let data = {}
        if (albumNameFlag) {
            data = {
                artistName: artistName,
                songName: songName,
                albumName: albumName
            }
        } else data = {
            artistName: artistName,
            songName: songName,
        }

        let res = {}
        try {
            res = fetch(
                '/api',
                {
                    method: 'POST',
                    body: JSON.stringify(data)
                }
            )

            if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`)

            res = await res.json()
        } catch (error) {console.error('Fetch failed:', error)}
    }

    const [ searchData, setSearchData ] = useState({
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
        searchData.songName.trim() !== ''
        && searchData.artistName.trim() !== ''
        && ((!albumCheckbox) || searchData.albumName.trim() !== '')

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
                    setSearchData(prev => ({ 
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
                <input type="text" placeholder="Enter artist" className="text-input" onChange={(e) => setSearchData(prev => ({
                    ...prev,
                    "artistName": e.target.value
                }))}/>
                <input type="text" placeholder="Enter song" className="text-input" onChange={(e) => setSearchData(prev => ({
                    ...prev,
                    "songName": e.target.value
                }))}/>
                <hr/>
                <div className="album-input">
                    <button className={ albumCheckbox ? "active checkbox" : "checkbox"} onClick={() => setAlbumCheckbox(prev => !prev)}></button>
                    <label className="details">Create an album/Add song to an existing album</label>
                </div>
                <input type="text" placeholder="Enter album" className={ albumCheckbox ? 'text-input' : 'disabled text-input'} disabled={ !albumCheckbox } onChange={(e) => setSearchData(prev => ({
                    ...prev,
                    "albumName": e.target.value
                }))}/>
                <hr/>
                <div className="thumbnail-input">
                    <button className={ thumbnailCheckbox ? "active checkbox" : "checkbox"} onClick={() => setThumbnailCheckbox(prev => !prev)}></button>
                    <label className="details">Add thumbnail</label>
                </div>
                <div className="thumbnail-output">
                    { searchData.thumbnailData == '' ? (
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
                            <button className="btn cancel-thumbnail-btn" onClick={() => setSearchData(prev => ({
                                ...prev,
                                "thumbnailData": ''
                            }))}></button>
                        </>
                    )}
                </div>
            </div>
            <hr className="main-hr"/>
                <button className={ addBtn ? 'btn' : 'disabled btn'} disabled={ !addBtn } onClick={() => handleSongAdd(searchData.artistName, searchData.songName, searchData.albumName, albumCheckbox)}>
                    <img src="/assets/white_plus.png" alt="" />
                </button>
        </div>
    )
};

export default SongAddPanel
