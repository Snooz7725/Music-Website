import './creator_hero.css'

function CreatorHero() {
    return (
        <div className="creator-hero-wrapper">
            <div className="content-wrapper">
                <div className="img-wrapper">
                    <img src="/assets/github.svg" alt="" />
                </div>
                <div className="details">
                    <h1 className="name">{}</h1>
                    <div className="album-count-wrapper">
                        <p className="album-count">Album Count</p>
                        <hr></hr>
                        <span>0</span>
                    </div>
                    <div className="song-count-wrapper">
                        <p className="song-count">Song Count</p>
                        <hr></hr>
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CreatorHero