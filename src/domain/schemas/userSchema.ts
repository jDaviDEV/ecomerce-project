import { Schema } from 'mongoose'
import { IUser } from '../interfaces/userInterface'

export const userSchema = new Schema<IUser>({
  userId: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  address: String
})
