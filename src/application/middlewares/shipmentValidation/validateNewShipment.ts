import { body } from 'express-validator'

export const newShipmentRules = [
  body('userId').trim().notEmpty().withMessage({ msg: 'userId is required', code: 422 }),
  body('shipmentId').trim().notEmpty().withMessage({ msg: 'shipmentId is required', code: 422 }),
  body('orderId').trim().notEmpty().withMessage({ msg: 'orderId is required', code: 422 }),
  body('trackingNumber').trim().notEmpty().withMessage({ msg: 'orderId is required', code: 422 }),
  body('shipmentCompany').trim().notEmpty().withMessage({ msg: 'orderId is required', code: 422 }),
  body('shipmentAddress').trim().notEmpty().withMessage({ msg: 'orderId is required', code: 422 })
]
