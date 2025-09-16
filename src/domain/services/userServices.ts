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

export async function deleteUserById (userId: string): Promise<undefined> {
  try {
    await UserModel.deleteOne({ userId })
  } catch (error) {
    console.log(error)
    throw new Error('It\' not possible to delete this user')
  }
}

export async function isUserIdRegister (userId: string): Promise<boolean> {
  // return a user if matched the userId otherwise return null
  const user = await UserModel.exists({ userId })
  // if user was not found then returns a null, by cheking if null then we can know if it exists
  // user !== null return true if exists, false otherwise
  return user !== null
}
