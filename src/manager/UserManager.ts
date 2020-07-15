
import { Users } from '../model/Auth/User'
import { dbAuth } from '../service/dbService'
export class UserManager {

  async createUser(UserData: Users) {
    const result = await dbAuth.users.createUser(UserData)
    return result
  }
  async findUserByUid(uid: string) {
    const result = await dbAuth.users.findUserByUid(uid)
    return result
  }
  async findUserByUsername(email: string) {
    const result = await dbAuth.users.findUserByEmail(email)
    return result
  }
  async findUserOrCreate(userData: Users) {
    const result = await dbAuth.users.createUser(userData)
    return result
  }
}
export default new UserManager()