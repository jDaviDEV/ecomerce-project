import { body } from 'express-validator'
import { isShipmentIdExistent, isShipmentTrackingNumberExistent } from '../../controllers/services/shipmentServices'

export const newShipmentRules = [
  body('userId').trim().notEmpty().withMessage({ msg: 'userId is required', code: 422 }),
  body('shipmentId').trim().notEmpty().withMessage({ msg: 'shipmentId is required', code: 422 }).custom(async (shipmentId: string) => {
    const exists: boolean = await isShipmentIdExistent(shipmentId)
    if (exists) {
      throw new Error(JSON.stringify({ msg: `The shipment with id: ${shipmentId} already exists`, code: 404 }))
    }
    return true
  }),
  body('orderId').trim().notEmpty().withMessage({ msg: 'orderId is required', code: 422 }),
  body('trackingNumber').trim().notEmpty().withMessage({ msg: 'trackingNumber is required', code: 422 }).custom(async (trackingNumber: string) => {
    const exists: boolean = await isShipmentTrackingNumberExistent(trackingNumber)
    if (exists) {
      throw new Error(JSON.stringify({ msg: `The tracking number: ${trackingNumber} already exists`, code: 404 }))
    }
    return true
  }),
  body('shipmentCompany').trim().notEmpty().withMessage({ msg: 'shipmentCompany is required', code: 422 }),
  body('shipmentAddress').trim().notEmpty().withMessage({ msg: 'shipmentAddress is required', code: 422 })
]
