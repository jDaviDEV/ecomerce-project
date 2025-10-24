import { model } from 'mongoose'
import { IProduct } from '../interfaces/productInterface'
import { productSchema } from '../schemas/productSchema'

export const ProductModel = model<IProduct>('Product', productSchema)
