import { Response, Request, NextFunction } from 'express'
import LineApi from '../service/lineApi'
import UserManager from '../manager/UserManager'
import * as _ from 'lodash'
import AuthManager from '../manager/AuthManager'
import { ErrorHandle, IError, CommonError } from '../common/errorHandle';
import { UserAttributes } from '../types/users'
import { IToken } from '../types/token'
import JWT  from '../common/jwt'
import { IUsers } from '../model/Auth/User';

export async function loginWithLine(req: Request, res: Response, next: NextFunction) {
  try {
    const { client } = res.locals
    const { access_token } = req.body
    const line = await LineApi.verifyToken(access_token)
    const userAccount = line.data
    let dataUser: UserAttributes = {
      userName: userAccount.sub,
      email: userAccount.email,
      pictureUrl: userAccount.picture,
      uid: userAccount.sub,
      idp: 'line'
    }
    const user: IUsers = await UserManager.findUserOrCreate(dataUser)
    const result = AuthManager.getTokenResult(user,client)
    res.status(200).json(result)
  } catch (error) {
    let err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
/**
 * This function is controller http request. It use to handle user from google login.
 * And get user profile to store in db then return result as token for authen other service
 * @param req {Object} Express.Request
 * @param res {Object} Express.Response
 * @param next {Object} Express.NextFunction
 */
export async function loginWithGoogle(req: Request, res: Response, next: NextFunction) {
  try {
    const { client } = res.locals
    const { access_token } = req.body
    const line = await LineApi.verifyToken(access_token)
    const userAccount = line.data
    let dataUser: UserAttributes = {
      userName: userAccount.sub,
      email: userAccount.email,
      pictureUrl: userAccount.picture,
      uid: userAccount.sub,
      idp: 'google'
    }
    const user = await UserManager.findUserOrCreate(dataUser)
    const result = AuthManager.getTokenResult(user,client)
    res.status(200).json(result)
  } catch (error) {
    let err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
export async function loginWithUsernamePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { client } = res.locals
    const { username, password } = req.body
    const user: any = await UserManager.findUserByUsername(username)
    if (user) {
      AuthManager.decodePassword(password, user.password)
      const result = await AuthManager.getTokenResult(user,client)
      res.status(200).json(result)
    } else {
      const err = new CommonError()
      err.setErrorByCode(err.ERROR_CODE.USER_NOT_FOUND.errorCode)
      throw err
    }
  } catch (error) {
    let err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}

export async function loginWithRefreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { grant_type, refresh_token } = req.body
    if (grant_type === 'refresh_token') {
      const result = await AuthManager.checkRefreshToken(refresh_token)
      res.status(200).json(result)
    } else {
      const err = new CommonError()
      err.setErrorByCode(err.ERROR_CODE.GRANT_TYPE_INVALID.errorCode)
      throw err
    }
  } catch (error) {
    let err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const userPayload: IToken = res.locals.payload
    if (userPayload.jti) {
      const result = await AuthManager.revokeToken(userPayload.jti)
      res.status(200).json(result)
    } else {
      const err = new CommonError()
      err.setErrorByCode(err.ERROR_CODE.GRANT_TYPE_INVALID.errorCode)
      throw err
    }
  } catch (error) {
    let err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.body
  try {
    const payload = JWT.verifyToken(token)
    res.status(200).json({
      isSuccess: true,
      data: payload
    })
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}