import React from 'react'
import './SingleCard.css'

export default function Cards({ card, handleChoice, flipped }) {

    const handleClick = () => {
        handleChoice(card)
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className="card-front" alt="card-front" />
                <img src="/img/cover.png" onClick={handleClick} alt="card-back" className="card-back" />
            </div>
        </div>       
    )
}
