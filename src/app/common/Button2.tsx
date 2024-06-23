import React from 'react'
import styles from './styles/button2.module.scss'
type Props = {
    text: string
    onClick: () => void
}

function Button2({text, onClick}: Props) {
  return (
    <button className={styles.btn} onClick={onClick}>
        {text}
    </button>
  )
}

export default Button2