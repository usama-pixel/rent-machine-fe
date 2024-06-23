import React from 'react'
import styles from './styles/button3.module.scss'
type Props = {
    text: string
    onClick: () => void
}

function Button3({text, onClick}: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
        <span className={styles.box}> {text}
        </span>
    </button>
  )
}

export default Button3