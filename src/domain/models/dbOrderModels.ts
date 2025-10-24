import { model } from 'mongoose'
import { orderSchema } from '../schemas/orderSchema'
import { IOrder } from '../interfaces/ordersInterface'

export const OrderModel = model<IOrder>('Order', orderSchema)
