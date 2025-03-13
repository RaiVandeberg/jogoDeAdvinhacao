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

const [ attempts, setAttempts ] = useState(0)
const [ letter, setLetter] = useState("")
const [leetersUsed, setLeetersUsed] = useState<LeetersUsedProps[]>([])
const [ challenge, setChallenge] = useState<Challenge | null >(null)

  function handleRestartGame(){
    alert("Reiniciando o jogo")

  }

  function startGame(){
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]
    setChallenge(randomWord)

    setAttempts(0)
    setLetter("")
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
      return alert("Letra já utilizada " + value)
    }

    setLeetersUsed((prevState) => [
      ...prevState, { value, correct: false}])
      setLetter("")

    
  }

  useEffect(() => {
    startGame()
  }, [])  

  if(!challenge){
    return
  }
  return(
    <div className={styles.container} >
      <main>
      <Header current={attempts} max={10} onRestart={handleRestartGame} />
      <Tip tip="Linguagem de Programação mais utilizadas" />

      <div className={styles.word}>
        {
          challenge.word.split("").map((letter, index) => (
            <Letter value="" />
          )        
        )}
      
      
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