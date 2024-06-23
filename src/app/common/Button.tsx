import React from 'react'
import styles from './styles/button.module.scss'
type Props = {
    text: string
    onClick: () => void
}

function Button({text, onClick}: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
        <span className={styles.button_top}> {text}
        </span>
    </button>
  )
}

export default Button