import styles from "./app.module.css";
import { Header } from "./components/Header"
import { Button } from "./components/Button";
import { Tip } from "./components/Header/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/input";
import { LeetersUsed } from "./components/LeetersUsed";

export default function App() {

  function handleRestartGame(){
    alert("Reiniciando o jogo")
  }
  return(
    <div className={styles.container} >
      <main>
      <Header current={5} max={10} onRestart={handleRestartGame} />
      <Tip tip="Linguagem de Programação mais utilizadas" />

      <div className={styles.word}>
      <Letter value="R"/>
      <Letter value="E"/>
      <Letter value="A"/>
      <Letter value="C"/>
      <Letter value="T"/>
      </div>

      <h4>Palpite</h4>

      <div className={styles.guess}>
      <Input autoFocus maxLength={1} placeholder="?"/>
      <Button title="Confirmar"/>
      </div>
      <LeetersUsed />
      </main>
    </div>
  )
}