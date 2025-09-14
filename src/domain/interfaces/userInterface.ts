export interface User {
  userId: string
  username: string
  email: string
  password: string
  phone: string
  address: string
}

// an object that contains the new information of the user
export type updatedUserInfo = Partial<User>
