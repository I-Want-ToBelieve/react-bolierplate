import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import styles from './style.module.scss'

const NotFound: React.FC = () => {
  const particle = useMemo(
    () =>
      Array.from({ length: 80 }, (it, index) => (
        <span className={styles.particle} key={index}>
          {index < 40 ? 4 : 0}
        </span>
      )),
    []
  )

  return useMemo(
    () => (
      <div className={styles.container}>
        {particle}
        <article className={styles.content}>
          <p>
            <strong>404 Not Found</strong>
          </p>
          <p>Oops, the page you're looking for doesn't exist.</p>
          <p>
            <Link to="/" className={styles.goHome}>
              Go To Home
            </Link>
          </p>
        </article>
      </div>
    ),
    [particle]
  )
}

export default NotFound
