import { User } from '../interfaces/userInterface'

export function registerNewUser (newUser: User): undefined {
  console.log(`${newUser.username} has registered`)
  return undefined
}
