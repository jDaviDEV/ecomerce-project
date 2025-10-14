import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export function validateRequest (req: Request, res: Response, next: NextFunction): Response | any {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => {
      try {
        const parsed = JSON.parse(err.msg)
        return parsed
      } catch {
        return { msg: err.msg, code: 400 }
      }
    })

    let statusCode: number = formattedErrors[0]?.code
    if (statusCode === undefined) {
      statusCode = 400
    }
    return res.status(statusCode).json({ errors: formattedErrors })
  }
  next()
}
