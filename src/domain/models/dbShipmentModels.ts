import { model } from 'mongoose'
import { IShiptment } from '../interfaces/shipmentInterface'
import { shipmentSchema } from '../schemas/shipmentSchemas'

export const ShipmentModel = model<IShiptment>('Shipment', shipmentSchema)
