export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface ICartProduct extends IProduct {
  quantity: number
}

// import type { IProduct } from '@/types' // импортируем с указанием 'type'

