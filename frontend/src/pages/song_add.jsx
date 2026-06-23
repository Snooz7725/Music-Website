import './song_add.css'
import { useState, useEffect } from 'react'
import { useLoadFetch } from '../utils/useLoadFetch'
import Searchbar from '../components/searchbar'
import Sidebar from '../components/sidebar'
import SongAddPanel from '../components/song_add_panel'

function SongAdd() {
    async function handleAddSong(newSongData) {
        try {
            fetch('/api/songs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data: newSongData}),
            })
        } catch (err) {
            console.error("Fetch failed:", err)
        }
    }

    async function handleAddArtist(artistData, thumbnailFlag) {
        const formData = new FormData();

        if (thumbnailFlag) {
            formData.append('blob', artistData.blob)
        } else formData.append('blob', null)

        formData.append('name', artistData.name)

        try {
            fetch('/api/artists?type=addArtist', {
                method: 'POST',
                body: formData
            })
        } catch (err) {
            console.error("Fetch failed:", err)
        }
    }

    const {data, loading, error} = useLoadFetch('/api/data?type=all', {method: 'GET'})

    // Song add panel vars
    const [newSongData, setNewSongData] = useState({
        artistName: '',
        songName: '',
        albumName: '',
        thumbnailData: ''
    })

    const addBtn = newSongData.songName.trim() !== ''
        && newSongData.artistName.trim() !== ''
        && ((!albumInputCheckbox) || newSongData.albumName.trim() !== '')

    const [ albumInputCheckbox, setAlbumInputCheckbox ] = useState(false)
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

    let likedAlbumsData = []
    let likedSongsCount = null
    if (!loading && error === null) {
        likedAlbumsData = data.data.albums.data.filter(album => data.data.liked_albums.data.some(likedAlbum => likedAlbum.album_id === album.id))
        likedAlbumsData = likedAlbumsData.map(likedAlbum => {
            // Count amount of songs that share album id and include it into the likedAlbumsData
            let songCount = data.data.songs.data.reduce((acc, song) => {
                if (song.album_id === likedAlbum.id) {
                    return ++acc
                } else return acc
            }, 0)

            likedAlbum.count = songCount
            return likedAlbum
        })

        likedSongsCount = data.data.liked_songs.data.reduce(acc => ++acc, 0)
    }

    return (
        <div className="song-add-wrapper">
            <Sidebar likedAlbumsData={likedAlbumsData} likedSongsCount={likedSongsCount} />
            <div className="main-section">
                <Searchbar />
                <div className="main-content">
                    <div className="panel-img-wrapper">
                        <img src="/assets/microphone.jpg" alt="" />
                    </div>
                    <SongAddPanel handleAddSong={handleAddSong} handleAddArtist={handleAddArtist} addBtn={addBtn} imgURL={imgURL} setPasteFlag={setPasteFlag} btnToggleFlag={btnToggleFlag} setBtnToggleFlag={setBtnToggleFlag} thumbnailInputCheckbox={thumbnailInputCheckbox} setThumbnailInputCheckbox={setThumbnailInputCheckbox} albumInputCheckbox={albumInputCheckbox} setAlbumInputCheckbox={setAlbumInputCheckbox} newSongData={newSongData} setNewSongData={setNewSongData} data={data}/>
                </div>
            </div>
        </div>
    )
}

export default SongAdd
