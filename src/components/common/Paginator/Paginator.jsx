import { useState } from 'react'
import styles from './Paginator.module.css'

const Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionSize = 10
  let portionCount = Math.ceil(pagesCount / portionSize)
  let { portionNumber, setPortionNumber } = useState(1)
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionNumber = portionNumber * portionSize

  return (
    <div className={styles.pagination}>
      { portionNumber > 1 &&
        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>Next</button>
      }

      {
        pages
          .filter(p => p => leftPortionNumber && p <= rightPortionNumber)
          .map(
            p => <span key={p} onClick={() => props.onPageChanged(p)}
              className={p === props.currentPage ? styles.selected : ''}>{p}</span>)
      }

      { portionCount > portionNumber &&
        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Prev</button>
      }
    </div>
  )
}

export default Paginator