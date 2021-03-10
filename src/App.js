import './App.css';
import {useEffect, useRef, useState} from 'react'

function App() {

  const STARTING_TIME = 5
  const [ text , setText ] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount , setWordCount] =useState(0)
  const inputRef = useRef(null)
  
  function handleChange(e) {
    const {value} = e.target
    setText(value)
}

function startGame() {
  setIsTimeRunning(true)
  setTimeRemaining(STARTING_TIME)
  setText("")
  inputRef.current.disabled = false
  inputRef.current.focus()
}

function endGame() {
  setIsTimeRunning(false)
  setWordCount(calculateWordCount(text))
}

function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
}

useEffect(()=>{
  if(isTimeRunning && timeRemaining > 0) {
    setTimeout(()=>{
      setTimeRemaining(prevTime=>prevTime-1)
    },1000)
  } else if(timeRemaining === 0) {
    endGame()
  }
},[timeRemaining,isTimeRunning])

  return (
    <div>
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
        <h1>How fast do you type?</h1>
        <textarea
            ref = {inputRef}
            onChange={handleChange}
            value={text}
            disabled = {!isTimeRunning}
        />
        <h4>Time remaining: {timeRemaining}</h4>
        <button onClick={startGame} disabled = {isTimeRunning}>Start</button>
        <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;