import express, { Router, Request, Response } from 'express'
import usersRouter from './users.route.ts'
import productsRouter from './products.route.ts'
import ordersRouter from './ordes.route.ts'
import shipmentsRouter from './shipments.route.ts'
import authRouter from './auth.route.ts'

const mainRouter: Router = Router()
mainRouter.use(express.json())

mainRouter.get('/', (_req: Request, res: Response) => {
  res.send('Main Page')
})

mainRouter.use('/api/v1',
  usersRouter,
  productsRouter,
  ordersRouter,
  shipmentsRouter,
  authRouter
)

export default mainRouter
