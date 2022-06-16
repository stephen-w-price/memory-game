import { useState, useEffect } from 'react';
import Card from './components/Card'
import './App.css';

const cardImages = [
  { "src" : "/img/agib.jpeg", matched: false},
  { "src" : "/img/bt.jpeg", matched: false},
  { "src" : "/img/s.jpeg", matched: false},
  { "src" : "/img/sbs.jpeg", matched: false},
  { "src" : "/img/twl.jpeg", matched: false},
  { "src" : "/img/yhf.jpeg", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  
  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() -0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
// Once we have two choices selected we need to compare the two cards
// Fire code when both choices have been made to evaluate choices to see if they match. 
// src property. 
// Log to the console weather the cards match or not. 
// handle a choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  // cannot perform evaluation here`
}

useEffect(() => {
  
  if (choiceOne && choiceTwo) {
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src){
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else {
      
      setTimeout(() => resetTurn(), 1000)
    }
  }

}, [choiceOne, choiceTwo])

console.log(cards)

// reset choices and increase turn 
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}


  return (
    <div className="App">
      <h1>Wilco Album Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <h2>Turns: {turns}</h2>
      
      <div className="card-grid">
        {cards.map(card => (
          <Card 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
