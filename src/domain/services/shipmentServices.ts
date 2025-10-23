import { IShipment, NewShipmentInfo, updatedShipmentInfo } from '../interfaces/shipmentInterface'
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

export async function getAllShipments (): Promise<IShipment[]> {
  try {
    const data = await ShipmentModel.find().lean().select('-__v -_id')
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Cannot fetch all users')
  }
}

export async function getShipmentStatus (trackingNumber: string): Promise<String> {
  try {
    const data = await ShipmentModel.find({ trackingNumber }).lean().select('-__v -_id')
    if (data[0] === undefined) {
      console.log(`Cannot find the shipment with the trackingNumber: ${trackingNumber}`)
    }
    return data[0].status
  } catch (error) {
    console.log(error)
    throw new Error(`Cannot find the shipment with the trackingNumber: ${trackingNumber}`)
  }
}

export async function isShipmentIdExistent (shipmentId: string): Promise<boolean> {
  const shipment = await ShipmentModel.exists({ shipmentId })
  return shipment !== null
}

export async function isShipmentTrackingNumberExistent (trackingNumber: string): Promise<boolean> {
  const shipmentTrackingNumber = await ShipmentModel.exists({ trackingNumber })
  return shipmentTrackingNumber !== null
}

export async function deleteShipmentById (shipmentId: string): Promise<undefined> {
  try {
    await ShipmentModel.deleteOne({ shipmentId })
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to delete this shipment')
  }
}

export async function updateShipmentInfo (updatedShipmentInfo: updatedShipmentInfo, shipmentId: string): Promise<undefined> {
  try {
    await ShipmentModel.updateOne({ shipmentId }, updatedShipmentInfo)
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to update this shipment')
  }
}
