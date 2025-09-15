import { updatedUserInfo, IUser } from '../interfaces/userInterface'
import { UserModel } from '../models/dbModels'

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

export function updateUserInfo (_updatedUserInfo: updatedUserInfo): undefined {
  console.log('The user data has been updated')
}
