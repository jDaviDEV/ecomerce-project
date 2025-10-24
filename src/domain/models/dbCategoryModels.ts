import { model } from 'mongoose'
import { ICategory } from '../interfaces/categoryInterface'
import { categorySchema } from '../schemas/categorySchema'

export const categoryModel = model<ICategory>('Category', categorySchema)
