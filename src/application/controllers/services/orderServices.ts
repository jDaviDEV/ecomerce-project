import { IOrder, updatedOrderInfo } from '../../../domain/interfaces/ordersInterface'
import { OrderModel } from '../../../domain/models/dbOrderModels'

export async function registerNewOrder (newOrderInfo: IOrder): Promise<undefined> {
  try {
    const newOrder = new OrderModel(newOrderInfo)
    await newOrder.save()
  } catch (error) {
    console.log(error)
    throw new Error('Cannot register this order, something went wrong')
  }
}

export async function updateOrderInfo (updatedOrderInfo: updatedOrderInfo, orderId: string): Promise<undefined> {
  try {
    await OrderModel.updateOne({ orderId }, updatedOrderInfo)
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to update this order information')
  }
}

export async function deleteOrder (orderId: string): Promise<undefined> {
  try {
    await OrderModel.deleteOne({ orderId })
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to delete this order')
  }
}

export async function getOrder (orderId: string): Promise<IOrder> {
  try {
    const data = await OrderModel.find({ orderId }).lean().select('-__v -_id')
    if (data[0] === undefined) {
      console.log(`Cannot find the user with the id: ${orderId}`)
    }
    return data[0]
  } catch (error) {
    console.log(error)
    throw new Error(`Cannot find the user with the id: ${orderId}`)
  }
}

export async function getAllOrders (): Promise<IOrder[]> {
  try {
    // .lean() to get plain javascript object and .select to get rid of the two keys that mongodb creates
    const data = await OrderModel.find().lean().select('-__v -_id')
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Cannot fetch all users')
  }
}
