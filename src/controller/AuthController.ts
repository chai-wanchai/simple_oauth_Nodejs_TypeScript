import { Response, Request, NextFunction } from 'express'
import LineApi from '../service/lineApi'
import UserManager from '../manager/UserManager'
import * as _ from 'lodash'
import AuthManager from '../manager/AuthManager'
import { ErrorHandle, IError, CommonError } from '../common/errorHandle';
import { UserAttributes } from '../@types/users'
import { IToken } from '../@types/token'
import JWT from '../common/jwt'
import { User } from '../model/Auth/User';
import AjaxResult from '../utils/AjaxResult'
import Middelware from '../manager/Middleware'

export async function loginWithLine(req: Request, res: Response, next: NextFunction) {
  try {
    const { client } = res.locals
    const { access_token } = req.body
    const line = await LineApi.verifyToken(access_token)
    const userAccount = line.data
    let dataUser: User = {
      username: userAccount.sub,
      email: userAccount.email,
      picture_url: userAccount.picture,
      uid: userAccount.sub,
      idp: 'line'
    }
    const user = await UserManager.findUserOrCreate(dataUser)
    const result = AuthManager.getTokenResult(user, client)
    res.status(200).json(result)
  } catch (error) {
    let err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
export async function loginWithGoogle(req: Request, res: Response, next: NextFunction) {
  try {
    const { client } = res.locals
    const { access_token } = req.body
    const line = await LineApi.verifyToken(access_token)
    const userAccount = line.data
    let dataUser: User = {
      username: userAccount.sub,
      email: userAccount.email,
      picture_url: userAccount.picture,
      uid: userAccount.sub,
      idp: 'google'
    }
    const user = await UserManager.findUserOrCreate(dataUser)
    const result = AuthManager.getTokenResult(user, client)
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
    const user: User = await UserManager.findUserByUsername(username,true)
    if (user) {
      AuthManager.decodePassword(password, user.password)
      const result = await AuthManager.getTokenResult(user, client)
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
  const result = new AjaxResult()
  try {
    const payload = JWT.verifyToken(token)
    result.data = payload
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err)
  }
  next([result, result.statusCode])
}
export async function searchRole(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const { page, criteria } = req.body;
    const resultDB = await AuthManager.searchRole(page, criteria);
    result.data = resultDB;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result, result.statusCode]);
}
export async function getAllRole(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const data = await AuthManager.getRoleList();
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function createRole(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.createRole(req.body, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function updateRoleByRoleId(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const { roleId } = req.params;
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.updateRole(roleId, req.body, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function deleteRoleById(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const { roleId } = req.params;
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.deleteRole(roleId, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function searchPermission(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const { page, criteria } = req.body;
    const resultDB = await AuthManager.searchPermission(page, criteria);
    result.data = resultDB;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function getAllPermission(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const data = await AuthManager.getPermissionList();
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function createPermission(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.createPermission(req.body, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function updatePermissionByCode(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const { permissionCode } = req.params;
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.updatePermission(permissionCode, req.body, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function deletePermissionByCode(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const { permissionCode } = req.params;
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.deletePermission(permissionCode, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function searchRolePermission(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const { page, criteria } = req.body;
    const resultDB = await AuthManager.searchRolePermission(page, criteria);
    result.data = resultDB;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function getAllRolePermission(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const data = await AuthManager.getRolePermissionList()
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function createRolePermission(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.createRolePermission(req.body, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function bulkCreateRolePermission(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.bulkCreateRolePermission(req.body, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function updateRolePermissionById(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const { rpId } = req.params;
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.updateRolePermission(rpId, req.body, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}
export async function deleteRolePermissionById(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult();
  try {
    const { rpId } = req.params;
    const payload = Middelware.getUserPayload(req)
    const data = await AuthManager.deleteRolePermission(rpId, payload);
    result.data = data;
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err);
  }
  next([result,result.statusCode]);
}