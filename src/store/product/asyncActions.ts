import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Data, FetchProps, ReturnedData } from './types'

export const fetchItems = createAsyncThunk<ReturnedData, FetchProps>(
  'products/fetchItemsStatus',
  async ({ category, sortBy, order, search, currentPage }) => {
    const url = 'https://62de126579b9f8c30ab29cbe.mockapi.io/items'
    const limit = 4
    const fullUrl = `${url}?page=${currentPage}&limit=${limit}&${category}&sortBy=${sortBy}&order=${order}${search}`

    const { data } = await axios.get<Data>(fullUrl)

    return { data, limit }
  }
)
