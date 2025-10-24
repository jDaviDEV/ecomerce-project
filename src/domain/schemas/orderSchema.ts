import { Schema, UpdateQuery } from 'mongoose'
import { IOrder } from '../interfaces/ordersInterface'

export const orderSchema = new Schema<IOrder>({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  products: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  shipmentAddress: { type: String, required: true },
  totalPrice: {
    type: Number,
    required: true,
    default: function (this: IOrder) {
      if (this.products === undefined || this.products.length === 0) return 0
      return this.products.reduce((acc, p) => acc + p.price * p.quantity, 0)
    }
  },
  createdAt: { type: Date, required: true, default: Date.now },
  modifiedAt: { type: Date, required: true, default: Date.now }
})

orderSchema.pre('save', function (next) {
  if (this.isModified('products')) {
    this.totalPrice = this.products.reduce((acc, p) => acc + p.price * p.quantity, 0)
  }
  next()
})

orderSchema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
  const update = this.getUpdate() as UpdateQuery<IOrder> | null | undefined

  // Verificamos que exista update y que tenga un campo products que sea un array
  const productsToUpdate = (update as any)?.products as IOrder['products'] | undefined

  if (Array.isArray(productsToUpdate)) {
    const total = productsToUpdate.reduce((acc: number, p) => {
      const price = p.price ?? 0
      const quantity = p.quantity ?? 0
      return acc + price * quantity
    }, 0)

    this.setUpdate({
      ...update,
      $set: {
        ...(update as any).$set,
        totalPrice: total,
        modifiedAt: new Date()
      }
    })
  } else {
    // Si no se actualizan los productos, igual actualizamos la fecha
    this.setUpdate({
      ...update,
      $set: {
        ...(update as any)?.$set,
        modifiedAt: new Date()
      }
    })
  }

  next()
})
