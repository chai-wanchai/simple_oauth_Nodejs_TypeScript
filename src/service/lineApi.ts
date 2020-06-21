import axios, { AxiosResponse } from 'axios';
import { LineProfile, LineVerifyResp } from '../types/lineType';
import { ErrorHandle } from '../common/errorHandle'
export class LineApi {
  public async getProfile(accessToken: string): Promise<AxiosResponse<LineProfile>> {
    try {
      const result = await axios.get(`${process.env.LINE_API}/v2/profile`,
        { headers: { Authorization: `Bearer ${accessToken}` } })
      return result
    } catch (error) {
      throw error
    }
  }
  public async verifyToken(accessToken: string): Promise<AxiosResponse<LineVerifyResp>> {
    try {
      const body = {
        id_token: accessToken,
        client_id: process.env.LINE_CLIENT_ID
      }
      const result = await axios.post(`${process.env.LINE_API}/oauth2/v2.1/verify`, body)
      return result
    } catch (error) {
      throw new ErrorHandle(error)
    }
  }
}
export default new LineApi()