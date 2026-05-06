import './creator_hero.css'

function CreatorHero({artistName, songCount, albumCount}) {
    return (
        <div className="creator-hero-wrapper">
            <div className="content-wrapper">
                <div className="img-wrapper">
                    <img src="/assets/github.svg" alt="" />
                </div>
                <div className="details">
                    <h1 className="name">{artistName}</h1>
                    <div className="album-count-wrapper">
                        <p className="album-count">Album Count</p>
                        <hr></hr>
                        <span>{albumCount}</span>
                    </div>
                    <div className="song-count-wrapper">
                        <p className="song-count">Song Count</p>
                        <hr></hr>
                        <span>{songCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CreatorHero