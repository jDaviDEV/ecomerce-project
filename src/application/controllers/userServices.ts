import { newUserInfo, User } from '../interfaces/userInterface'

export function registerNewUser (newUser: User): undefined {
  console.log(`${newUser.username} has registered`)
  return undefined
}

export function updateUserInfo (_newUserInfo: newUserInfo): undefined {
  console.log('The user data has been updated')
  return undefined
}
