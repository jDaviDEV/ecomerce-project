import { param } from 'express-validator'
import { isShipmentIdExistent } from '../../controllers/services/shipmentServices'

export const validateShipmentIdExistenceAsParams = [
  param('shipmentId').trim().notEmpty().withMessage({ msg: 'shipmentId is required', code: 422 }).custom(async (shipmentId: string) => {
    const exists: boolean = await isShipmentIdExistent(shipmentId)
    if (!exists) {
      throw new Error(JSON.stringify({ msg: `The shipment with id: ${shipmentId} does not exist`, code: 404 }))
    }
    return true
  })
]
