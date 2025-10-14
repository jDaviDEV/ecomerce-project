export interface IShipment {
  userId: string
  shipmentId: string
  orderId: string
  trackingNumber: string
  status:
  'pending' | // the shipment is register but not processed
  'processing' | // the shipment is getting ready to be delivered
  'ready for pickup' | // the shipment is ready to get picked for the transportation company
  'in transit' | // the shipment is on the way
  'to be delivered' | // the shipment in on the way to your home
  'failed delivery' | // the shipment was not delivered due to the customer's absence from home
  'returned to sender' | // the shipment was returned to the seller or store
  'delivered' | // the shipment was delivered to the customer
  'cancelled' | // the shipment is canceled at the customer's discretion
  'lost' | // the shipment got lost on the way
  'delayed' // the shipment is late
  shipmentCompany: string
  shipmentAddress: string
  deliveredAt: Date | null
}

export type NewShipmentInfo = Omit<IShipment, 'status' | 'deliveredAt'>
