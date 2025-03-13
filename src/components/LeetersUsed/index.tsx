import styles from "./styles.module.css"

import { Letter } from "../Letter"

export type LeetersUsedProps = {
  value: string
  correct: boolean
}

type Props = {
  data: LeetersUsedProps[]
}

export function LeetersUsed({data}: Props){ 
  return (
    <div className={styles.leetersUsed}>
      <h5>Letras Utilizadas</h5>
      <div>
        {
          data.map(({value, correct}) => (
            <Letter 
            value={value} 
            size="small" 
            color={correct ? "correct" : "wrong"} />
          ))}
        
        
      </div>
    </div>
  )
} 