import { body } from 'express-validator'
import { isShipmentTrackingNumberExistent } from '../../controllers/services/shipmentServices'

export const updatedShipmentRules = [
  body('userId').optional().trim().notEmpty().withMessage({ msg: 'userId should not be empty', code: 422 }),
  body('orderId').optional().trim().notEmpty().withMessage({ msg: 'orderId should not be empty', code: 422 }),
  body('trackingNumber').optional().trim().notEmpty().withMessage({ msg: 'trackingNumber should not be empty', code: 422 }).custom(async (trackingNumber: string) => {
    const exists: boolean = await isShipmentTrackingNumberExistent(trackingNumber)
    if (exists) {
      throw new Error(JSON.stringify({ msg: `The tracking number: ${trackingNumber} already exists`, code: 404 }))
    }
    return true
  }),
  body('shipmentCompany').optional().trim().notEmpty().withMessage({ msg: 'shipmentCompany should not be empty', code: 422 }),
  body('shipmentAddress').optional().trim().notEmpty().withMessage({ msg: 'shipmentAddress should not be empty', code: 422 })
]
