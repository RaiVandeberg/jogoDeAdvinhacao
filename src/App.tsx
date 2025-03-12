import styles from "./app.module.css";
import { Header } from "./components/Header"
import { Tip } from "./components/Header/Tip";
import { Letter } from "./components/Letter";

export default function App() {

  function handleRestartGame(){
    alert("Reiniciando o jogo")
  }
  return(
    <div className={styles.container} >
      <main>
      <Header current={5} max={10} onRestart={handleRestartGame} />
      <Tip tip="Linguagem de Programação mais utilizadas" />
      <div>
      <Letter value="R"/>
      <Letter value="E"/>
      <Letter value="A"/>
      <Letter value="C"/>
      <Letter value="T"/>
      </div>
      </main>
    </div>
  )
}