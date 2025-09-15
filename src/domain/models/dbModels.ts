import { IUser } from '../interfaces/userInterface'
import { model } from 'mongoose'
import { userSchema } from '../schemas/userSchema'

export const UserModel = model<IUser>('User', userSchema)
