import { Schema } from 'mongoose'
import { IInventory } from '../interfaces/inventoryInterface'

export const inventorySchema = new Schema<IInventory>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  stock: { type: Number, required: true }
})
