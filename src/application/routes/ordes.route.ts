import { Router, Request, Response } from 'express'
import { IOrder, updatedOrderInfo } from '../../domain/interfaces/ordersInterface'
import * as orderServices from '../controllers/services/orderServices.ts'

const ordersRouter: Router = Router()

ordersRouter.get('/orders', async (_req: Request, res: Response) => {
  const data: IOrder[] = await orderServices.getAllOrders()
  res.status(200).send(data)
})

ordersRouter.get('/orders/:orderId', async (req: Request, res: Response) => {
  const orderId: string = req.params.orderId
  const data: IOrder = await orderServices.getOrder(orderId)
  res.status(200).send(data)
})

ordersRouter.post('/orders', async (req: Request, res: Response) => {
  const newOrderInfo: IOrder = req.body
  await orderServices.registerNewOrder(newOrderInfo)
  res.status(201).send(`The order with id: ${newOrderInfo.orderId} was register`)
})

ordersRouter.patch('/orders/:orderId', async (req: Request, res: Response) => {
  const orderId: string = req.params.orderId
  const updatedOrderInfo: updatedOrderInfo = req.body
  await orderServices.updateOrderInfo(updatedOrderInfo, orderId)
  res.status(200).send(`The order has been updated with: ${JSON.stringify(updatedOrderInfo)}`)
})

ordersRouter.delete('/orders/:orderId', async (req: Request, res: Response) => {
  const orderId: string = req.params.orderId
  await orderServices.deleteOrder(orderId)
  res.status(200).send(`The order with id: ${orderId} has been deleted`)
})

export default ordersRouter
