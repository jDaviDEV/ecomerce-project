import { Router, Request, Response } from 'express'

const authRouter: Router = Router()

authRouter.post('/auth/login', (_req: Request, _res: Response) => {})
authRouter.post('/auth/logout', (_req: Request, _res: Response) => {})

export default authRouter
