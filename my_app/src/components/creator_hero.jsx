import './creator_hero.css'

function CreatorHero() {
    return (
        <div className="creator-hero-wrapper">
            <div className="left-panel">
                <h1>Welcome To SoundVault</h1>
                <p>A website for listing your favourite albums & songs</p>
                <hr></hr>
                <ul className="btn-list">
                    <li><a className="github-btn btn" href="https://github.com">
                        <div className="icon-wrapper">
                            <img src="/assets/github.svg" alt="GitHub" />
                        </div>
                        <span>GitHub</span>
                    </a></li>
                </ul>
            </div>
        </div>
    )
};

export default CreatorHero