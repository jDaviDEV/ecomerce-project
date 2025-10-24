import { Router, Request, Response } from 'express'
import * as shipmentServices from '../controllers/services/shipmentServices.ts'
import { IShipment, NewShipmentInfo, updatedShipmentInfo } from '../../domain/interfaces/shipmentInterface'
import { validateRequest } from '../middlewares/validateRequest.ts'
import { newShipmentRules } from '../middlewares/shipmentValidation/validateNewShipment.ts'
import { trackingNumberExistenceAsParams } from '../middlewares/shipmentValidation/validateTrackingNumberExistence.ts'
import { validateShipmentIdExistenceAsParams } from '../middlewares/shipmentValidation/validateShipmentId.ts'
import { updatedShipmentRules } from '../middlewares/shipmentValidation/validateUpdatedShipmentInfo.ts'
import { userExistenceAsBodyRules } from '../middlewares/userValidations/validateUserExistence.ts'

const shipmentsRouter: Router = Router()

shipmentsRouter.get('/shipments', async (_req: Request, res: Response) => {
  const data: IShipment[] = await shipmentServices.getAllShipments()
  res.status(200).send(data)
})

shipmentsRouter.get('/shipments/tracking/:trackingNumber', trackingNumberExistenceAsParams, validateRequest, async (req: Request, res: Response) => {
  const trackingNumber: string = req.params.trackingNumber
  const data: string = JSON.stringify(await shipmentServices.getShipmentStatus(trackingNumber))
  res.status(200).send(`status: ${data}`)
})

shipmentsRouter.post('/shipments', userExistenceAsBodyRules, newShipmentRules, validateRequest, async (req: Request, res: Response) => {
  const newShipmentInfo: NewShipmentInfo = req.body
  await shipmentServices.registerNewShipment(newShipmentInfo)
  res.status(201).send(`A new shipment has been created, shipmentId: ${newShipmentInfo.shipmentId}`)
})

shipmentsRouter.delete('/shipments/:shipmentId', validateShipmentIdExistenceAsParams, validateRequest, async (req: Request, res: Response) => {
  const shipmentId = req.params.shipmentId
  await shipmentServices.deleteShipmentById(shipmentId)
  res.status(200).send(`The shipment with id: ${shipmentId} was deleted`)
})

shipmentsRouter.patch('/shipments/:shipmentId', validateShipmentIdExistenceAsParams, userExistenceAsBodyRules, updatedShipmentRules, validateRequest, async (req: Request, res: Response) => {
  const shipmentId = req.params.shipmentId
  const updatedShipmentInfo: updatedShipmentInfo = req.body
  await shipmentServices.updateShipmentInfo(updatedShipmentInfo, shipmentId)
  res.status(200).send('The shipment information has been updated')
})

export default shipmentsRouter
