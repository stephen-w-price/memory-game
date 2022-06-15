import './Card.css'

export default function Card({ card, handleChoice, flipped, disabled }) {
   
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
    
  }
  
  
  return (
    <div>
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
              <img className="front" src={card.src} alt="card front"/>
              <img 
                className="back" 
                src="img/wilco.jpeg" 
                onClick={handleClick} 
                alt="card back"

              />
            </div>
          </div>
      
    </div>
  )
}
