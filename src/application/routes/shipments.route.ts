import { Router, Request, Response } from 'express'

const shipmentsRouter: Router = Router()

shipmentsRouter.get('/shipments', (_req: Request, _res: Response) => {})
shipmentsRouter.get('/shipments/tracking/:trackingNumber', (_req: Request, _res: Response) => {})

export default shipmentsRouter
