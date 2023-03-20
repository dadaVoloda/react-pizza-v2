import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems } from './asyncActions'
import { ProductSliceState, ReturnedData, Status } from './types'

const initialState: ProductSliceState = {
  items: [],
  pageCount: 1,
  status: Status.LOADING,
}

export const productSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<ReturnedData>) => {
        const { data, limit } = action.payload
        state.status = Status.SUCCESS
        state.items = data.items
        state.pageCount = Math.ceil(data.count / limit)
      }
    )
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const { setItems } = productSlice.actions

export default productSlice.reducer
