import { Router, Request, Response } from 'express'
import * as shipmentServices from '../../domain/services/shipmentServices.ts'
import { NewShipmentInfo } from '../../domain/interfaces/shipmentInterface'
import { validateRequest } from '../middlewares/validateRequest.ts'
import { newShipmentRules } from '../middlewares/shipmentValidation/validateNewShipment.ts'

const shipmentsRouter: Router = Router()

shipmentsRouter.get('/shipments', (_req: Request, _res: Response) => {})
shipmentsRouter.get('/shipments/tracking/:trackingNumber', (_req: Request, _res: Response) => {})

shipmentsRouter.post('/shipments', newShipmentRules, validateRequest, async (req: Request, res: Response) => {
  const newShipmentInfo: NewShipmentInfo = req.body
  await shipmentServices.registerNewShipment(newShipmentInfo)
  res.status(201).send(`A new shipment has been created, shipmentId: ${newShipmentInfo.shipmentId}`)
})

export default shipmentsRouter
