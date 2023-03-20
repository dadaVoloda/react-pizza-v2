import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, SearchParams, Sort } from './types'

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  selectedSortType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
      state.currentPage = 1
    },
    changeSortType(state, action: PayloadAction<Sort>) {
      state.selectedSortType = action.payload
      state.currentPage = 1
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<SearchParams>) {
      state.currentPage = Number(action.payload.page)
      state.categoryId = Number(action.payload.category) || 0
      state.selectedSortType = action.payload.sortBy
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
})

export const {
  changeCategory,
  changeSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
