import { Router, Request, Response } from 'express'

const ordersRouter: Router = Router()

ordersRouter.get('/orders', (_req: Request, _res: Response) => {})
ordersRouter.get('/orders/:orderId', (_req: Request, _res: Response) => {})
ordersRouter.post('/orders', (_req: Request, _res: Response) => {})
ordersRouter.patch('/orders/:orderId', (_req: Request, _res: Response) => {})
ordersRouter.delete('/orders/:orderId', (_req: Request, _res: Response) => {})

export default ordersRouter
