import React, { useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  
  function generateDie() {
    return {
            value: Math.floor(Math.random()*6)+1,
            isHeld: false,
            id: nanoid()
    }
  }

  function allNewDice() {
    const nums = []
    for (let i=0;i<10;i++) {
      nums.push(generateDie())
    }
    return nums
  }

  function handleClick() {
      tenzies ? setDice(allNewDice): setDice(prevDice => prevDice.map(die => die.isHeld? die: generateDie()))
      setTenzies(false)
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => id === die.id ? {...die, isHeld: !die.isHeld} : die))
   }

  const [dice, setDice] = React.useState(allNewDice())
  const diceNumbers = dice.map(die => 
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      onClick={() => holdDice(die.id)}
    />
    )
  const [tenzies, setTenzies] = useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dice])
  

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="main--grid">
        {diceNumbers}
      </div>
      <button onClick={handleClick} className="button">
        {tenzies? "New Game": "Roll"}
      </button>
    </main>
  )
}