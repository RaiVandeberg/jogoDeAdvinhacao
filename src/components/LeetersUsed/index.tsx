import styles from "./styles.module.css"
import { Letter } from "../Letter"

export function LeetersUsed() {
  return (
    <div className={styles.leetersUsed}>
      <h5>Letras Utilizadas</h5>
      <div>
        <Letter value="X" size="small" color="correct" />
        <Letter value="R" size="small" color="wrong"/>
      </div>
    </div>
  )
} 