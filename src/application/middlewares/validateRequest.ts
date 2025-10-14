import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export function validateRequest (req: Request, res: Response, next: NextFunction): Response | any {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => {
      const msg = err.msg

      if (typeof msg === 'object' && msg !== null && 'msg' in msg && 'code' in msg) {
        // Case: .withMessage({ msg, code })
        return msg
      }

      if (typeof msg === 'string') {
        try {
          // Case: throw new Error(JSON.stringify(...))
          return JSON.parse(msg)
        } catch {
          return { msg, code: 400 }
        }
      }

      return { msg: 'Unknown error', code: 400 }
    })

    const uniqueErrors = formattedErrors.filter(
      (error, index, self) =>
        index === self.findIndex(e => e.msg === error.msg && e.code === error.code)
    )

    let statusCode: number = uniqueErrors[0]?.code
    if (statusCode === undefined) {
      statusCode = 400
    }
    return res.status(statusCode).json({ errors: uniqueErrors })
  }
  next()
}
