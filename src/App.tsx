import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import './scss/app.scss'

const Cart = React.lazy(
  () => import(/* webpackChankName: 'Cart' */ './pages/Cart')
)
const NotFound = React.lazy(
  () => import(/* webpackChankName: 'NotFound' */ './pages/NotFound')
)
const Product = React.lazy(
  () => import(/* webpackChankName: 'Product' */ './pages/Product')
)

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='pizza/:id' element={<Product />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
