import './song_add_panel.css'

function SongAddPanel({handleAddNewSong, addBtn, imgURL, setPasteFlag, btnToggleFlag, setBtnToggleFlag, thumbnailInputCheckbox, setThumbnailInputCheckbox, albumInputCheckbox, setAlbumInputCheckbox, newSongData, setNewSongData, data}) {
    return (
        <div className="song-add-panel-wrapper">
            <div className="hero">
                <img src="./assets/microphone.jpg" alt=""/>
                <span>Wanna Add A New Song?</span>
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter song" className="text-input" onChange={(e) => setNewSongData(prev => ({
                    ...prev,
                    "songName": e.target.value
                }))}/>
                <hr/>
                
                <input type="text" placeholder="Enter artist" list="artistInput" className="text-input" onChange={(e) => setNewSongData(prev => ({
                    ...prev,
                    "artistName": e.target.value
                }))}/>
                <datalist id="artistInput">
                    {data?.data?.artists?.data?.map(artist =>
                        <option key={artist.id}>{artist.name}</option>
                    )}
                </datalist>
                <hr/>

                <div className="album-input">
                    <button className={ albumInputCheckbox ? "active checkbox" : "checkbox"} onClick={() => setAlbumInputCheckbox(prev => !prev)}></button>
                    <label className="details">Add song to an existing album</label>
                </div>
                <input type="text" placeholder="Enter album" list="albumInput" className={ albumInputCheckbox ? 'text-input' : 'disabled text-input'} disabled={ !albumInputCheckbox } onChange={(e) => setNewSongData(prev => ({
                    ...prev,
                    "albumName": e.target.value
                }))}/>
                <datalist id="albumInput">
                    {data?.data?.albums?.data?.map(album =>
                        <option key={album.id}>{album.title}</option>
                    )}
                </datalist>
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
                    <img src="./assets/white_paste.png" alt="paste" />
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
                                <img src="./assets/white_closed_bin.png" alt="delete" />
                            </button>
                        </>
                    )}
                </div>
            </div>
            <hr className="main-hr"/>
            <div className="btn-list">
                <button className={ addBtn ? 'btn' : 'disabled btn'} disabled={ !addBtn } onClick={() => handleAddNewSong()}>
                    <img src="/assets/white_plus.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default SongAddPanel
