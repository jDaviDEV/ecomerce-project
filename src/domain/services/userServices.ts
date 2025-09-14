import { updatedUserInfo, User } from '../interfaces/userInterface'

export function registerNewUser (newUser: User): undefined {
  console.log(`${newUser.username} has registered`)
}

export function updateUserInfo (_updatedUserInfo: updatedUserInfo): undefined {
  console.log('The user data has been updated')
}
