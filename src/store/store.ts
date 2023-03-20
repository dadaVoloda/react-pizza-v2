import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filter/slice'
import cartReducer from './cart/slice'
import productsReducer from './product/slice'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    products: productsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
