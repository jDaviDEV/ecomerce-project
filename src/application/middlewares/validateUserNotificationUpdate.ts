import { body } from 'express-validator'
import { isUserIdInNotifications } from '../../domain/services/userServices'

export const userNotificationUpdateRules = [
  body('userId').trim().notEmpty().withMessage({ msg: 'userId is required', code: 422 }).bail().custom(async (userId: string) => {
    const userIdNotificationExists: boolean = await isUserIdInNotifications(userId)
    if (!userIdNotificationExists) {
      throw new Error(JSON.stringify({ msg: `User with id ${userId} has no notifications`, code: 404 }))
    }

    return true
  })

]
