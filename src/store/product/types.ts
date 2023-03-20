export type Product = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ProductSliceState {
  items: Product[]
  pageCount: number
  status: Status
}

export type Data = {
  items: Product[]
  count: number
}

export interface ReturnedData {
  data: Data
  limit: number
}

export interface FetchProps {
  category: string
  sortBy: string
  order: string
  search: string
  currentPage: number
}
