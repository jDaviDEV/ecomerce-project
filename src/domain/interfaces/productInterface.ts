export interface IProduct {
  productId: string
  name: string
  description: string
  price: number
  categories: string[]
  imageUrl: string
}

export type updatedProductInfo = Partial<Omit<IProduct, 'productId'>>
