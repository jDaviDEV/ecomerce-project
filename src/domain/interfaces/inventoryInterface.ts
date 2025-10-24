export interface IInventory {
  productId: string
  name: string
  stock: number
}

export type updatedInventoryInfo = Partial<Omit<IInventory, 'productId'>>
