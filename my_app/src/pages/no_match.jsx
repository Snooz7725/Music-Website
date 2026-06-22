import './no_match.css'
import { useLoadFetch } from '../../utils/useLoadFetch'
import Sidebar from '../components/sidebar'


function NoMatch() {
    const {data, loading, error} = useLoadFetch(`/api/data?type=all`, {method: 'GET'})

    let likedAlbumsData = []
    let likedSongsCount = null
    if (!loading && error === null) {
        likedAlbumsData = data.data.albums.filter(album => data.data.liked_albums.some(likedAlbum => likedAlbum.album_id === album.id))
        likedAlbumsData = likedAlbumsData.map(likedAlbum => {
            // Count amount of songs that share album id and include it into the likedAlbumsData
            let songCount = data.data.songs.reduce((acc, song) => {
                if (song.album_id === likedAlbum.id) {
                    return ++acc
                } else return acc
            }, 0)

            likedAlbum.count = songCount
            return likedAlbum
        })

        likedSongsCount = data.data.liked_songs.reduce(acc => ++acc, 0)
    }

    return (
        <div className="no-match-wrapper">
            <Sidebar likedAlbumsData={likedAlbumsData} likedSongsCount={likedSongsCount}/>
            <div className="error-message">
                <h1>Error 404 - Not Found</h1>
            </div>
        </div>
    )
}

export default NoMatch
