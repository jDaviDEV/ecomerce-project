import { Router, Request, Response } from 'express'

const usersRouter: Router = Router()

usersRouter.get('/users/profile/:userId', (req: Request, res: Response) => {
  res.send(`your user id is: ${req.params.userId}`)
})
usersRouter.get('/users/notifications/:userId', (req: Request, res: Response) => {
  res.json(
    {
      userId: req.params.userId,
      notifications: [
        {
          notificationId: 'ntf_001',
          title: 'Shipment delivered',
          message: 'Your shipment was delivered',
          createdAt: '2025-08-28'
        },
        {
          notificationId: 'ntf_002',
          title: 'Shipment on road',
          message: 'Your shipment is on the way to your home',
          createdAt: '2025-08-26'
        }
      ]
    }
  )
})
usersRouter.post('/users', (_req: Request, _res: Response) => {})
usersRouter.patch('/users/:userId', (_req: Request, _res: Response) => {})
usersRouter.delete('/users/profile/:userId', (_req: Request, _res: Response) => {})

export default usersRouter
