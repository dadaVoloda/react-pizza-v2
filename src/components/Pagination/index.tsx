import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../store/filter/slice'
import { selectProducts } from '../../store/product/selectors'

import styles from './Pagination.module.scss'

export const Pagination: React.FC = () => {
  const { pageCount } = useSelector(selectProducts)
  const dispatch = useDispatch()
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={0}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel='<'
    />
  )
}
