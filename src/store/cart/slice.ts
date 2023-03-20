import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { CartItem, CartSliceState } from './types'

const { items, totalPrice } = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice,
  items,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const { price, id } = action.payload
      const findItem = state.items.find((obj) => obj.id === id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice += price
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id)
      state.totalPrice = calcTotalPrice(state.items)
    },
    decreaseItemsCount(state, action: PayloadAction<CartItem>) {
      const { price, id } = action.payload
      const findItem = state.items.find((obj) => obj.id === id)
      if (findItem.count > 1) {
        findItem.count--
        state.totalPrice -= price
      }
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, clearItems, decreaseItemsCount } =
  cartSlice.actions

export default cartSlice.reducer
