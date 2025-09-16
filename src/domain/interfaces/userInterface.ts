import { Document } from 'mongoose'

export interface IUser {
  userId: string
  username: string
  email: string
  password: string
  phone: string
  address: string
}

// an object that contains the new information of the user
// intended to be used as an object to get the info when trying tu update user information
export type updatedUserInfo = Partial<Omit<IUser, 'userId'>>
export interface IUserDocument extends IUser, Document {}
