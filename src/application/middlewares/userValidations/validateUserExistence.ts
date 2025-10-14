import { param, body } from 'express-validator'
import { isUserIdRegister, isUserIdInNotifications } from '../../../domain/services/userServices'

export const userExistenceAsParamsRules = [
  param('userId').trim().notEmpty().withMessage({ msg: 'userId is required', code: 422 }).bail().custom(async (userId: string) => {
    const exists: boolean = await isUserIdRegister(userId)
    if (!exists) {
      throw new Error(JSON.stringify({ msg: `User with id ${userId} does not exist`, code: 404 }))
    }
    return true
  })
]

export const userIdInNotificationsExistenceAsParamsRules = [
  param('userId').trim().notEmpty().withMessage({ msg: 'UserId is requiered', code: 422 }).bail().custom(async (userId: string) => {
    const exists: boolean = await isUserIdInNotifications(userId)
    if (!exists) {
      throw new Error(JSON.stringify({ msg: `User with id ${userId} does not exist`, code: 404 }))
    }
    return true
  })
]

export const userExistenceAsBodyRules = [
  body('userId').trim().notEmpty().withMessage({ msg: 'userId is required', code: 422 }).bail().custom(async (userId: string) => {
    const exists: boolean = await isUserIdRegister(userId)
    if (!exists) {
      throw new Error(JSON.stringify({ msg: `User with id ${userId} does not exist`, code: 404 }))
    }
    return true
  })
]
