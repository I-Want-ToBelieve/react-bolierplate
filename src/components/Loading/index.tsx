import React, { useMemo } from 'react'
import styles from './style.module.scss'

const Loading: React.FC = () => {
  const cells = useMemo(
    () => Array.from('Loading', (it, index) => <span key={index}>{it}</span>),
    []
  )

  return useMemo(
    () => (
      <div className={styles.container}>
        <span className={styles.back}>{cells}</span>
      </div>
    ),
    [cells]
  )
}

export default Loading
