import { body } from 'express-validator'

export const newNotificationRules = [
  body('userId').trim().notEmpty().withMessage({ msg: 'userId is required', code: 422 }),
  body('notifications').isArray({ min: 1, max: 1 }).withMessage({ msg: 'notifications must be an array with one notification, and can not be empty', code: 422 }),
  body('notifications.*.notificationId').trim().notEmpty().withMessage({ msg: 'notificationId is required', code: 422 }).isString().withMessage({ msg: 'notificationId must be a string', code: 422 }),
  body('notifications.*.title').trim().notEmpty().withMessage({ msg: 'title is required', code: 422 }).isString().withMessage({ msg: 'title must be a string', code: 422 }),
  body('notifications.*.message').trim().notEmpty().withMessage({ msg: 'message is required', code: 422 }).isString().withMessage({ msg: 'message must be a string', code: 422 }),
  body('notifications.*.createdAt').optional().trim().notEmpty().withMessage({ msg: 'createdAt is required', code: 422 }).isISO8601().withMessage({ msg: 'createdAt must be a valid date', code: 422 })
]
