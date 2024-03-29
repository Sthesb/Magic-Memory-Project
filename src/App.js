import { useState, useEffect } from 'react';
import SingleCard from './components/Card/SingleCard';
import './App.css';

const cardImages = [
  { "src" : "/img/helmet-1.png", matched: false },
  { "src" : "/img/potion-1.png", matched: false },
  { "src" : "/img/ring-1.png", matched: false },
  { "src" : "/img/scroll-1.png", matched: false },
  { "src" : "/img/shield-1.png", matched: false },
  { "src" : "/img/sword-1.png", matched: false }
]


function App() {
  const [cards, setCards ] = useState([]);
  const [turns, setTurns ] = useState(0);
  const [disabled, setDisabled ] = useState(false);
  
  // user choice
  const [choiceOne, setChoiceOne ] = useState(null);
  const [choiceTwo, setChoiceTwo ] = useState(null);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0)
  }

  // handle user choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // start a new game automatically

  useEffect(()=> {
    shuffleCards();
  }, [])

  // compare 2 choices
  useEffect(() => {
    
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceTwo.src === choiceOne.src) { 
        // if the cards src match
        setCards( prevCards => {
          return prevCards.map( card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        setTimeout(() => resetTurn(), 1000)
      }else {
        console.log('these choices do not match')
        setTimeout(() => resetTurn(), 800)
      }
    }
    
  }, [choiceOne, choiceTwo])


  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={() => shuffleCards()}>New Game</button>
      <div className="card-grid">
        {
          cards.map((card) => {
            return (
              <SingleCard 
                card={ card } 
                key={card.id} 
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched }
                disabled={disabled} />
              )
            }  
          )
        }
      </div>

      <p>Number of Turns : {turns }</p>
    </div>
  );
}

export default App;
