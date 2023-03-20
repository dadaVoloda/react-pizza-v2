import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import qs from 'qs'
import {
  PizzaBlock,
  Skeleton,
  Sort,
  Categories,
  Pagination,
} from '../components'
import { list as sortList } from '../components/Sort'

import { useAppDispatch } from '../store/store'
import { selectFilter } from '../store/filter/selectors'
import { selectProducts } from '../store/product/selectors'
import { setCurrentPage, setFilters } from '../store/filter/slice'
import { fetchItems } from '../store/product/asyncActions'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const {
    categoryId,
    selectedSortType: sortType,
    currentPage,
    searchValue,
  } = useSelector(selectFilter)
  const { items, status } = useSelector(selectProducts)

  useEffect(() => {
    const queryString = window.location.search
    if (queryString) {
      const params = qs.parse(queryString, { ignoreQueryPrefix: true })
      const sortBy = sortList.find((obj) => obj.sortProperty === params.sortBy)
      dispatch(setFilters({ ...params, sortBy }))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortBy: sortType.sortProperty,
          category: categoryId,
          page: currentPage,
        },
        { addQueryPrefix: true }
      )
      navigate(queryString)
    }
    isMounted.current = true
  }, [categoryId, sortType, currentPage])

  const getItems = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sortType.sortProperty
    const order = sortType.sortProperty === 'rating' ? 'desc' : 'asc'
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(fetchItems({ category, sortBy, order, search, currentPage }))

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!isSearch.current) {
      getItems()
    }
    isSearch.current = false
  }, [categoryId, sortType, searchValue, currentPage])

  useEffect(() => {
    dispatch(setCurrentPage(1))
  }, [searchValue])

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort value={sortType} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось получить пиццы.</p>
        </div>
      ) : (
        <>
          <div className='content__items'>
            {status === 'loading' ? skeletons : pizzas}
          </div>
          <Pagination />
        </>
      )}
    </div>
  )
}

export default Home
