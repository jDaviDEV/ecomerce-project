import { Router, Request, Response } from 'express'
import { updatedUserInfo, IUser } from '../../domain/interfaces/userInterface.ts'
import * as userServices from '../../domain/services/userServices.ts'

const usersRouter: Router = Router()

usersRouter.get('/users/profile/:userId', async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  if (await userServices.isUserIdRegister(userId)) {
    const userProfileInfo: IUser[] = await userServices.getUser(userId)
    res.status(200).send(userProfileInfo)
  } else {
    res.status(404).send({
      error: {
        code: '404 NOT FOUND',
        details: `The user with userId: ${userId} does not exist`
      }
    })
  }
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

// this route must be async in order to wait that the function getAllUsers() returns the data
usersRouter.get('/users', async (_req: Request, res: Response) => {
  const data = await userServices.getAllUsers()
  res.status(200).send(data)
})

usersRouter.post('/users', (req: Request, res: Response) => {
  const newUser: IUser = req.body
  void userServices.registerNewUser(newUser)
  res.status(201).send(`the user ${newUser.username} have been registered`)
})

usersRouter.patch('/users/:userId', async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  if (await userServices.isUserIdRegister(userId)) {
    const { username, email, password, phone, address } = req.body
    const updatedUserInfo: updatedUserInfo = { username, email, password, phone, address }
    await userServices.updateUserInfo(updatedUserInfo, userId)
    res.status(200).send(`The user information has been updated:\n ${JSON.stringify(updatedUserInfo)}`)
  } else {
    res.status(404).send({
      error: {
        code: '404 NOT FOUND',
        details: `The user with userId: ${userId} does not exist`
      }
    })
  }
})

usersRouter.delete('/users/profile/:userId', async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  if (await userServices.isUserIdRegister(userId)) {
    await userServices.deleteUserById(userId)
    res.status(200).send(`the user with id: ${userId} was deleted`)
  } else {
    res.status(404).send({
      error: {
        code: '404 NOT FOUND',
        details: `The user with userId: ${userId} does not exist`
      }
    })
  }
})

export default usersRouter
