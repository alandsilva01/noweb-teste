import React from 'react'
import styles from './Header.module.scss'

export default function Header({ onOpenSearch }: { onOpenSearch: () => void }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>NowSearch</div>
      <nav className={styles.right}>
        <button className={styles.searchBtn} onClick={onOpenSearch} aria-haspopup="dialog">🔍 Buscar CEP</button>
      </nav>
    </header>
  )
}