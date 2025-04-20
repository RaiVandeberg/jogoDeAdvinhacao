import { WORDS, Challenge } from "./utils/words";
import styles from "./app.module.css";

import { useEffect } from "react";
import { useState } from "react";

import { Header } from "./components/Header"
import { Button } from "./components/Button";
import { Tip } from "./components/Header/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/input";
import { LeetersUsed, LeetersUsedProps } from "./components/LeetersUsed";


export default function App() {
const [score, setScore] = useState(0)
const [ letter, setLetter] = useState("")
const [leetersUsed, setLeetersUsed] = useState<LeetersUsedProps[]>([])
const [ challenge, setChallenge] = useState<Challenge | null >(null)
const [shake , setShake] = useState(false)

const ATTEMPTS_MARGIN = 3


  function handleRestartGame(){
    const isConfirmed = window.confirm("Deseja reiniciar o jogo?")
    if(isConfirmed){
      startGame()
      setLeetersUsed([])

    }else(!isConfirmed)
    {
      console.log("Reinício cancelado.")
    }
    

  }

  function startGame(){
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)

    setScore(0)
    setLetter("")
    setLeetersUsed([])
  }

  function handleConfirm(){
    if(!challenge) {
      return
    }

    if (!letter.trim()){
      return alert("Digite uma letra")
    }

    const value = letter.toUpperCase()
    const exists = leetersUsed.find((used) => used.value === value)

    if(exists){
      setLetter("")
      return alert("Letra já utilizada " + value)
    }

    const hits = challenge.word.toUpperCase().split("").filter((char) => char === value).length

    const correct = hits > 0
    const currentScore = score + hits

    setLeetersUsed((prevState) => [
      ...prevState, { value, correct}])

      setScore(currentScore)
      setLetter("")

      if(!correct){
        setShake(true)
        setTimeout(() => {
          setShake(false)
        }, 300)
      }

    
  }

  function endGame(message: string){
    alert(message)
    startGame()

  }

  useEffect(() => {
    startGame()
  }, [])  
  

  useEffect(() => {
    if(!challenge){
      return
    }

    setTimeout(() => {
      if(score === challenge.word.length){
        return endGame ("Parabéns, você acertou a palavra")
      }

      const attemptsLimit = challenge.word.length + ATTEMPTS_MARGIN
      if(leetersUsed.length === attemptsLimit){
        return endGame("Você perdeu, tente novamente")}
    }, 200)
  }, [score, leetersUsed.length])

  if(!challenge){
    return
  }
  return(
    <div className={styles.container} >
      <main>
      <Header current={leetersUsed.length} max={challenge?.word.length + ATTEMPTS_MARGIN} onRestart={handleRestartGame} />
      <Tip tip={challenge.tip} />

      <div className={`${styles.word} ${shake && styles.shake}`}>
        {challenge.word.split("").map((letter, index) => {
            const letterUsed = leetersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase()
            )

            return <Letter 
            key={index} 
            value={letterUsed?.value} 
            color={letterUsed?.correct ? "correct" : "default" } />
          })}
      
      
      </div>

      <h4>Palpite</h4>

      <div className={styles.guess}>
      <Input autoFocus maxLength={1} 
      placeholder="?" 
      value={letter}
      onChange={(e)=> 
      setLetter(e.target.value)}/>
      <Button title="Confirmar" onClick={handleConfirm}/>
      </div>
      <LeetersUsed data={leetersUsed} />
      </main>
    </div>
  )
}