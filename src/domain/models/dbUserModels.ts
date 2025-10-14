import { IUser, IUserNotification } from '../interfaces/userInterface'
import { model } from 'mongoose'
import { userNotificationSchema, userSchema } from '../schemas/userSchemas'

export const UserModel = model<IUser>('User', userSchema)
export const UserNotificationModel = model<IUserNotification>('UserNotifications', userNotificationSchema)
