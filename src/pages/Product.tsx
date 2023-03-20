import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Product {
  imageUrl: string
  title: string
  price: number
}

const Product: React.FC = () => {
  const [product, setProduct] = useState<Product>()
  const { id } = useParams()
  const navigate = useNavigate()

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://62de126579b9f8c30ab29cbe.mockapi.io/items/${id}`
      )
      setProduct(data)
    } catch (error) {
      alert('Такой пиццы нет')
      navigate('/')
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  if (!product) {
    return <div className='container'>Загрузка...</div>
  }

  return (
    <div className='container'>
      <img src={product.imageUrl} />
      <h2>{product.title}</h2>
      <h4>{product.price}</h4>
      <button
        type='button'
        className='button button--outline button--add'
        onClick={() => navigate(-1)}
      >
        <span>Назад</span>
      </button>
    </div>
  )
}

export default Product
