import { body } from 'express-validator'

export const registerUserRules = [
  body('userId').trim().notEmpty().withMessage({ msg: 'userId is required', code: 422 }),
  body('username').trim().notEmpty().withMessage({ msg: 'username can not be empty or contain only spaces', code: 422 }).isLength({ min: 5 }).withMessage({ msg: 'Username should be at least 5 character long', code: 422 }).matches(/^[A-Za-z0-9_]+$/).withMessage({ msg: 'Username can only contain letters, numbers and underscores', code: 422 }),
  body('email').isEmail().withMessage({ msg: 'Invalid email format', code: 422 }),
  body('password').trim().notEmpty().withMessage({ msg: 'password can not be empty or contain only spaces', code: 422 }).isLength({ min: 8 }).withMessage({ msg: 'Weak password, it should be at least 8 character long', code: 422 }),
  body('address').optional().trim().notEmpty().withMessage({ msg: 'address can not be empty or contain only spaces', code: 422 }),
  body('phone').optional().trim().isNumeric().withMessage({ msg: 'Phone number must be numeric', code: 422 }).isLength({ min: 10, max: 10 }).withMessage({ msg: 'The phone number must be 10 digits long', code: 422 })
]
