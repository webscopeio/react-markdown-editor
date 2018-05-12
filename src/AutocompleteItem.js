import * as React from 'react'
import styles from './AutocompleteItem.module.css'

export default ({ entity: { char, keywords } }) => {
  const [ firstKeyword ] = keywords
  return (
    <div className={styles.wrapper}>
      <span className={styles.char}>{char}</span>
      <span className={styles.keyword}>{firstKeyword}</span>
    </div>
  )
}
