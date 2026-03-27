import { useState } from 'react'
import './hero.css'

function Hero() {
    const [state, setState] = useState(true)

    return (
        <div className="hero-wrapper">
            <div className="left-panel">
                <h1>Welcome To SoundVault</h1>
                <p>A website for listing your favourite albums & songs</p>
                <hr></hr>
                <div className="button-list">
                    {/* github button */}
                </div>
            </div>
        </div>
    )
};

export default Hero