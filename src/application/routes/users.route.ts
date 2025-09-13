import { Router, Request, Response } from 'express'
import { updatedUserInfo, User } from '../interfaces/userInterface'
import * as userServices from '../controllers/userServices.ts'

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

usersRouter.post('/users', (req: Request, res: Response) => {
  const newUser: User = req.body
  userServices.registerNewUser(newUser)
  res.status(201).send(`the user ${newUser.username} have been registered`)
})

usersRouter.patch('/users/:userId', (req: Request, res: Response) => {
  const updatedUserInfo: updatedUserInfo = req.body
  userServices.updateUserInfo(updatedUserInfo)
  res.status(200).send(`The user information has been updated:\n ${JSON.stringify(updatedUserInfo)}`)
})

usersRouter.delete('/users/profile/:userId', (_req: Request, _res: Response) => {})

export default usersRouter
