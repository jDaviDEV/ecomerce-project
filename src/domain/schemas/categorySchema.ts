import { Schema } from 'mongoose'
import { ICategory } from '../interfaces/categoryInterface'

export const categorySchema = new Schema<ICategory>({
  categories: { type: [String], required: true }
})
