import React from 'react'
import { useRef } from 'react'
import _ from 'lodash'

import styles from './Search.module.scss'
import { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../store/filter/slice'

export const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState<string>('')
  const searchInput = useRef<HTMLInputElement>()

  const clearInput = () => {
    dispatch(setSearchValue(''))
    setSearch('')
    searchInput.current.focus()
  }

  const updateSearchValue = useCallback(
    _.debounce((search: string) => dispatch(setSearchValue(search)), 400),
    []
  )

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground='new 0 0 32 32'
        id='Glyph'
        version='1.1'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z'
          id='XMLID_223_'
        />
      </svg>
      <input
        ref={searchInput}
        onChange={(e) => changeValue(e)}
        value={search}
        className={styles.input}
        type='text'
        placeholder='Поиск пиццы...'
      />
      {search && (
        <svg
          className={styles.clearIcon}
          onClick={clearInput}
          height='512px'
          id='Layer_1'
          version='1.1'
          viewBox='0 0 512 512'
          width='512px'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z' />
        </svg>
      )}
    </div>
  )
}
