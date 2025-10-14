import { NewShipmentInfo } from '../interfaces/shipmentInterface'
import { ShipmentModel } from '../models/dbShipmentModels'

export async function registerNewShipment (newShipmentInfo: NewShipmentInfo): Promise<undefined> {
  try {
    const newShipment = new ShipmentModel(newShipmentInfo)
    await newShipment.save()
    console.log(`${newShipment.shipmentId} has been registered`)
  } catch (error) {
    console.log(error)
    throw new Error('Cannot register this shipment, something went wrong')
  }
}
