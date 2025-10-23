import { param } from 'express-validator'
import { isShipmentTrackingNumberExistent } from '../../../domain/services/shipmentServices'

export const trackingNumberExistenceAsParams = [
  param('trackingNumber').trim().notEmpty().withMessage({ msg: 'trackingNumber is required', code: 422 }).isString().withMessage('Tracking Number must be a string').custom(async (trackingNumber: string) => {
    const exists: boolean = await isShipmentTrackingNumberExistent(trackingNumber)
    if (!exists) {
      throw new Error(JSON.stringify({ msg: `The trackingNumber: ${trackingNumber} does not exist`, code: 404 }))
    }
    return true
  })
]
