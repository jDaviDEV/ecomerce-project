import { model } from 'mongoose'
import { IInventory } from '../interfaces/inventoryInterface'
import { inventorySchema } from '../schemas/inventorySchema'

export const InventoryModel = model<IInventory>('Inventory', inventorySchema)
