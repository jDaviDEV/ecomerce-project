import { param } from 'express-validator'
import { isUserNotificationIdExistent } from '../../../domain/services/userServices'

export const userNotificationIdExistenceAsParamsRules = [
  param('notificationId').optional().trim().notEmpty().withMessage({ msg: 'notificationId is empty', code: 422 }),
  param('userId').trim().notEmpty().withMessage({ msg: 'userId is required', code: 422 }).bail().custom(async (userId: string, { req }) => {
    const { notificationId } = req.params as { userId: string, notificationId: string }
    const exists = await isUserNotificationIdExistent(userId, notificationId)
    if (!exists) {
      throw new Error(JSON.stringify({ msg: `notificationId ${notificationId} does not exist for user ${userId}`, code: 404 }))
    }
    return true
  })
]
