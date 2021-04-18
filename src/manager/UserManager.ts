
import { User } from '../model/Auth/User'
import { dbAuth } from '../service/dbService'
export class UserManager {

  async createUser(UserData: User) {
    const result = await dbAuth.users.createUser(UserData)
    return result
  }
  async findUserByUid(uid: string) {
    const result = await dbAuth.users.findUserByUid(uid)
    return result
  }
  async updateUserById(id: number, userInfo: User) {
    const result = await dbAuth.users.updateUserById(userInfo, id)
  }
  async findUserById(id: number) {
    const result = await dbAuth.users.findUserById(id)
    return result
  }
  async findUserByUsername(email: string, requirePassword: boolean = false) {
    const result = await dbAuth.users.findUserByEmailOrUsername(email, requirePassword)
    return result
  }
  async findUserOrCreate(userData: User) {
    const result = await dbAuth.users.createUser(userData)
    return result
  }
  async getAllUser() {
    const result = await dbAuth.users.getAllUsers()
    return result
  }
}
export default new UserManager()