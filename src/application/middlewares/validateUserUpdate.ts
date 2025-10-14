import { body } from 'express-validator'

export const updateUserRules = [
  body('email').optional().isEmail().withMessage({ msg: 'Invalid email format', code: 422 }),
  body('username').optional().trim().notEmpty().withMessage({ msg: 'username can not be empty or contain only spaces', code: 422 }).isLength({ min: 5 }).withMessage({ msg: 'Username should be at least 5 character long', code: 422 }).matches(/^[A-Za-z0-9_]+$/).withMessage({ msg: 'Username can only contain letters, numbers and underscores', code: 422 }),
  body('phone').optional().trim().isNumeric().withMessage({ msg: 'Phone number must be numeric', code: 422 }).isLength({ min: 10, max: 10 }).withMessage({ msg: 'The phone number must be 10 digits long', code: 422 }),
  body('address').optional().trim().notEmpty().withMessage({ msg: 'address can not be empty or contain only spaces', code: 422 }),
  body('password').optional().trim().notEmpty().withMessage({ msg: 'password can not be empty or contain only spaces', code: 422 }).isLength({ min: 8 }).withMessage({ msg: 'Weak password, it should be at least 8 character long', code: 422 }),

  body().custom((_value, { req }) => {
    if (req.body === undefined || Object.keys(req.body).length === 0) {
      throw new Error(JSON.stringify({ msg: 'Request body cannot be empty', code: 422 }))
    }
    return true
  })
]
