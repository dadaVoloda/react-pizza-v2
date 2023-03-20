import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilter } from '../store/filter/selectors'
import { changeCategory } from '../store/filter/slice'

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

export const Categories: React.FC = React.memo(() => {
  const { categoryId } = useSelector(selectFilter)
  const dispatch = useDispatch()

  const onChangeCategory = useCallback((i: number) => {
    dispatch(changeCategory(i))
  }, [])

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, i) => (
          <li
            className={categoryId === i ? 'active' : ''}
            onClick={() => onChangeCategory(i)}
            key={category}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
})
