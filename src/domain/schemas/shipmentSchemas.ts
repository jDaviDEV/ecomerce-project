import { Schema } from 'mongoose'
import { IShipment } from '../interfaces/shipmentInterface'

export const shipmentSchema = new Schema<IShipment>({
  userId: { type: String, required: true },
  shipmentId: { type: String, required: true },
  orderId: { type: String, required: true },
  trackingNumber: { type: String, required: true },
  status: {
    type: String,
    enum: [
      'pending',
      'processing',
      'ready for pickup',
      'in transit',
      'to be delivered',
      'delivered',
      'failed delivery',
      'returned to sender',
      'cancelled',
      'lost',
      'delayed'
    ],
    default: 'pending',
    required: true
  },
  shipmentCompany: { type: String, required: true },
  shipmentAddress: { type: String, required: true },
  deliveredAt: { type: Date, default: null }
})
