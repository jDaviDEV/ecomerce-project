import { Router, Request, Response } from 'express'
import { updatedUserInfo, IUser, IUserNotification } from '../../domain/interfaces/userInterface.ts'
import * as userServices from '../../domain/services/userServices.ts'
import { registerUserRules } from '../middlewares/userValidations/validateUserRegistration.ts'
import { updateUserRules } from '../middlewares/userValidations/validateUserUpdate.ts'
import { userExistenceAsParamsRules, userExistenceAsBodyRules, userIdInNotificationsExistenceAsParamsRules } from '../middlewares/userValidations/validateUserExistence.ts'
import { validateRequest } from '../middlewares/userValidations/validateRequest.ts'
import { userExistenceInNotificationsRules } from '../middlewares/userValidations/validateUserIdExistenceInNotifications.ts'
import { newNotificationRules } from '../middlewares/userValidations/validateUserNewNotification.ts'
import { userNotificationUpdateRules } from '../middlewares/userValidations/validateUserNotificationUpdate.ts'
import { userNotificationIdExistenceAsParamsRules } from '../middlewares/userValidations/validateNotificationExistence.ts'

const usersRouter: Router = Router()

usersRouter.get('/users', async (_req: Request, res: Response) => {
  const data = await userServices.getAllUsers()
  res.status(200).send(data)
})

usersRouter.post('/users', registerUserRules, validateRequest, async (req: Request, res: Response) => {
  const newUser: IUser = req.body
  await userServices.registerNewUser(newUser)
  res.status(201).send(`the user ${newUser.username} have been registered`)
})

usersRouter.patch('/users/profile/:userId', userExistenceAsParamsRules, updateUserRules, validateRequest, async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  const { username, email, password, phone, address } = req.body
  const updatedUserInfo: updatedUserInfo = { username, email, password, phone, address }
  await userServices.updateUserInfo(updatedUserInfo, userId)
  res.status(200).send(`The user information has been updated:\n ${JSON.stringify(updatedUserInfo)}`)
})

usersRouter.get('/users/profile/:userId', userExistenceAsParamsRules, validateRequest, async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  const userProfileInfo: IUser[] = await userServices.getUser(userId)
  res.status(200).send(userProfileInfo)
})

usersRouter.delete('/users/profile/:userId', userExistenceAsParamsRules, validateRequest, async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  await userServices.deleteUserById(userId)
  res.status(200).send(`the user with id: ${userId} was deleted`)
})

usersRouter.post('/users/notifications', userExistenceAsBodyRules, userExistenceInNotificationsRules, newNotificationRules, validateRequest, async (req: Request, res: Response) => {
  const newNotification: IUserNotification = req.body
  await userServices.createNewUserNotification(newNotification)
  res.status(201).send('the notification was created')
})

usersRouter.patch('/users/notifications', userExistenceAsBodyRules, userNotificationUpdateRules, newNotificationRules, validateRequest, async (req: Request, res: Response) => {
  const newNotification: IUserNotification = req.body
  const response = await userServices.updateExistentUserNotification(newNotification)
  if (response === 'user not found') {
    res.status(404).send('this userId does not exists inside the collection, you may want to create a new notification')
  } else if (response === 'notification updated') {
    res.status(200).send('the user notifications has been updated')
  } else {
    res.status(200).send('a new notification has been added to the user')
  }
})

usersRouter.get('/users/notifications/:userId', userExistenceAsParamsRules, validateRequest, async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  const data = await userServices.getAllUserNotifications(userId)
  res.status(200).send(data)
})

usersRouter.get('/users/notifications/:userId/:notificationId', userIdInNotificationsExistenceAsParamsRules, userNotificationIdExistenceAsParamsRules, validateRequest, async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  const notificationId: string = req.params.notificationId
  const data = await userServices.getUserNotification(userId, notificationId)
  res.status(200).send(data)
})

usersRouter.get('/users/notifications', async (_req: Request, res: Response) => {
  const data = await userServices.getAllNotifications()
  res.status(200).send(data)
})

usersRouter.delete('/users/notifications/:userId/:notificationId', userIdInNotificationsExistenceAsParamsRules, userNotificationIdExistenceAsParamsRules, validateRequest, async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  const notificationId: string = req.params.notificationId
  await userServices.deleteUserNotification(userId, notificationId)
  res.status(200).send(`notification ${notificationId} have been deleted`)
})

usersRouter.delete('/users/notifications/:userId', userIdInNotificationsExistenceAsParamsRules, validateRequest, async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  await userServices.deleteAllUserNotifications(userId)
  res.status(200).send(`All the notications of the user with id: ${userId} have been deleted`)
})

export default usersRouter
