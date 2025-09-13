export interface User {
  userId: string
  username: string
  email: string
  password: string
  phone: string
  address: string
}

export type updatedUserInfo = Partial<User>
