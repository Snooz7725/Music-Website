import { useState } from 'react'
import './hero.css'
import githubIcon from '../assets/github.svg'

function Hero() {
    const [state, setState] = useState(true)

    return (
        <div className="hero-wrapper">
            <div className="left-panel">
                <h1>Welcome To SoundVault</h1>
                <p>A website for listing your favourite albums & songs</p>
                <hr></hr>
                <ul className="btn-list">
                    <li><a className="github-btn btn" href="#">
                        <div className="icon-wrapper">
                            <img src={githubIcon} alt="GitHub" />
                        </div>
                        <span>GitHub</span>
                    </a></li>
                </ul>
            </div>
        </div>
    )
};

export default Hero