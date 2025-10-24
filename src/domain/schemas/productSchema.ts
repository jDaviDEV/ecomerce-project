import { Schema } from 'mongoose'
import { IProduct } from '../interfaces/productInterface'

export const productSchema = new Schema<IProduct>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categories: { type: [String], required: true },
  imageUrl: { type: String, required: true }
})
