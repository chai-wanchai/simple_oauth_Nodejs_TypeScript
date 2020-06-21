import UserModel, { UserModelType } from '../service/dbService/user'
import { UserAttributes } from '../types/users'
export class UserManager {
  public getResultDBToJson(data: any) {
    if (data) {
      return JSON.parse(JSON.stringify(data))
    } else {
      return data
    }
  }
  async createUser(UserData: UserAttributes) {
    const result = await UserModel.upsert(UserData, { returning: true })
    return this.getResultDBToJson(result[0])
  }
  async findUserByUid(uid: string) {
    const result = await UserModel.findOne({
      where: {
        uid: uid
      }
    })
    return this.getResultDBToJson(result)
  }
  async findUserByUsername(email: string) {
    const result = await UserModel.findOne({
      where: {
        email: email
      }
    })

    return this.getResultDBToJson(result)

  }
  async findUserOrCreate(userData: UserAttributes): Promise<any> {
    const result = await UserModel.findOrCreate({ where: { uid: userData.uid }, defaults: userData } as any)
    return result
  }
}
export default new UserManager()