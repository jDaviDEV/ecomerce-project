import { model } from 'mongoose'
import { IShipment } from '../interfaces/shipmentInterface'
import { shipmentSchema } from '../schemas/shipmentSchemas'

export const ShipmentModel = model<IShipment>('Shipment', shipmentSchema)
