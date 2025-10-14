import { updatedUserInfo, IUser, IUserNotification } from '../interfaces/userInterface'
import { UserModel, UserNotificationModel } from '../models/dbModels'

export async function registerNewUser (newUserInfo: IUser): Promise<undefined> {
  try {
    const newUser = new UserModel(newUserInfo)
    await newUser.save()
    console.log(UserModel.find())
    console.log(`${newUser.username} has registered`)
  } catch (error) {
    console.log(error)
    throw new Error('Cannot register this user, something went wrong')
  }
}

export async function getAllNotifications (): Promise<IUserNotification[]> {
  try {
    // .lean() to get plain javascript object and .select to get rid of the two keys that mongodb creates
    const data = await UserNotificationModel.find().lean().select('-__v -_id')
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Cannot fetch all notifications')
  }
}

export async function updateExistentUserNotification (newUserNotification: IUserNotification): Promise<'user not found' | 'notification updated' | 'notification added'> {
  try {
    const userNotificationExists = await UserNotificationModel.exists({ userId: newUserNotification.userId })
    const userNotificationIdExists = await UserNotificationModel.exists({ userId: newUserNotification.userId, 'notifications.notificationId': newUserNotification.notifications[0].notificationId })
    if (userNotificationExists !== null) {
      if (userNotificationIdExists !== null) {
        await updateUserNotification(newUserNotification)
        return 'notification updated'
      } else {
        await addNewUserNotification(newUserNotification)
        return 'notification added'
      }
    } else {
      return 'user not found'
    }
  } catch (error) {
    console.log(error)
    throw new Error('Cannot update this user notification, something went wrong, check if the userId is right')
  }
}

export async function createNewUserNotification (newUserNotification: IUserNotification): Promise<undefined> {
  try {
    const newNotification = new UserNotificationModel(newUserNotification)
    await newNotification.save()
  } catch (error) {
    console.log(error)
    throw new Error('Cannot enter this notification, something went wrong')
  }
}

export async function updateUserNotification (newUserNotification: IUserNotification): Promise<undefined> {
  try {
    await UserNotificationModel.updateOne(
      {
        userId: newUserNotification.userId,
        'notifications.notificationId': newUserNotification.notifications[0].notificationId
      },
      {
        $set: {
          'notifications.$': newUserNotification.notifications[0]
        }

      }
    )
  } catch (error) {
    console.log(error)
    throw new Error('The notification you are trying to update, does not exists')
  }
}

export async function addNewUserNotification (updatedUserNotification: IUserNotification): Promise<undefined> {
  try {
    // the $push property adds a new item to the array
    await UserNotificationModel.updateOne({ userId: updatedUserNotification.userId }, { $push: { notifications: updatedUserNotification.notifications[0] } })
  } catch (error) {
    console.log(error)
    throw new Error('Cannot enter this notification, something went wrong')
  }
}

export async function getAllUserNotifications (userId: string): Promise<IUserNotification[]> {
  try {
    const data = await UserNotificationModel.find({ userId }).lean().select('-__v -_id')
    return data
  } catch (error) {
    console.log(error)
    throw new Error(`Cannot find the user with the id: ${userId}`)
  }
}

export async function getUserNotification (userId: string, notificationId: string): Promise<IUserNotification[]> {
  try {
    const data = await UserNotificationModel.aggregate([
      { $match: { userId } },
      {
        $project: { //  $project works like a field filtering method, those fields with 0 are not shown but those with 1
          _id: 0,
          userId: 1,
          notifications: { // here I select the notifications array
            $filter: { // $filter selects only the items inside the array that matches the condition
              input: '$notifications', // 'input' gets the array to be filter wich is $notifications
              as: 'notif', // 'as' is the variable name that is given to each item inside the array
              cond: { $eq: ['$$notif.notificationId', notificationId] } // 'cond' this is the condition to be met
            }
          }
        }
      }
    ])

    return data
  } catch (error) {
    console.log(error)
    throw new Error(`Can not get notifications from user ${userId}`)
  }
}

export async function getUser (userId: string): Promise<IUser[]> {
  try {
    const data = await UserModel.find({ userId }).lean().select('-__v -_id')
    if (data[0] === undefined) {
      console.log(`Cannot find the user with the id: ${userId}`)
    }
    return data
  } catch (error) {
    console.log(error)
    throw new Error(`Cannot find the user with the id: ${userId}`)
  }
}

export async function getAllUsers (): Promise<IUser[]> {
  try {
    // .lean() to get plain javascript object and .select to get rid of the two keys that mongodb creates
    const data = await UserModel.find().lean().select('-__v -_id')
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Cannot fetch all users')
  }
}

export async function updateUserInfo (updatedUserInfo: updatedUserInfo, userId: string): Promise<undefined> {
  try {
    await UserModel.updateOne({ userId }, updatedUserInfo)
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to update this user information')
  }
}

export async function deleteUserNotification (userId: string, notificationId: string): Promise<undefined> {
  try {
    await UserNotificationModel.updateOne({ userId }, { $pull: { notifications: { notificationId } } })
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to delete this user\'s notifications')
  }
}

export async function deleteAllUserNotifications (userId: string): Promise<undefined> {
  try {
    await UserNotificationModel.updateOne({ userId }, { $set: { notifications: [] } })
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to delete this user\'s notifications')
  }
}

export async function deleteUserById (userId: string): Promise<undefined> {
  try {
    await UserModel.deleteOne({ userId })
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to delete this user')
  }
}

export async function isUserIdRegister (userId: string): Promise<boolean> {
  // return a user if matched the userId otherwise return null
  const user = await UserModel.exists({ userId })
  // if user was not found then returns a null, by cheking if null then we can know if it exists
  // user !== null return true if exists, false otherwise
  return user !== null
}

export async function isUserIdInNotifications (userId: string): Promise<boolean> {
  const userIdNotification = await UserNotificationModel.exists({ userId })
  return userIdNotification !== null
}

export async function isUserNotificationIdExistent (userId: string, notificationId: string): Promise<boolean> {
  const userNotificationIdExists = await UserNotificationModel.exists({ userId, 'notifications.notificationId': notificationId })
  return userNotificationIdExists !== null
}
