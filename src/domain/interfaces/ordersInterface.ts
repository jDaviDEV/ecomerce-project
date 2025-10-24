export interface IOrder {
  orderId: string
  userId: string
  products: IOrderProduct[]
  shipmentAddress: string
  totalPrice: number
  createdAt: Date
  modifiedAt: Date
}

export interface IOrderProduct {
  productId: string
  name: string
  price: number
  quantity: number
}

export type updatedOrderInfo = Partial<Omit<IOrder, 'orderId'>>
