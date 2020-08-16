import * as express from 'express';
import * as controller from '../controller/AuthController'
import JWT from '../common/jwt'
import { ErrorHandle } from '../common/errorHandle';
import { AuthValidation } from '../validation/AuthValidation';
import  Middelware  from '../manager/Middleware';

export const router = express.Router();

// router.post('/oauth/authorize', loginWithRefreshToken);
router.get('/verify', Verify);
router.post('/token', AuthValidation, AuthType);
router.post('/role/search', Middelware.handleToken, controller.searchRole);
router.post('/role/create', Middelware.handleToken, controller.createRole);
router.get('/role/list', Middelware.handleToken, controller.getAllRole);
router.patch('/role/update/:roleId', Middelware.handleToken, controller.updateRoleByRoleId);
router.delete('/role/delete/:roleId', Middelware.handleToken, controller.deleteRoleById);
router.post('/permission/search', Middelware.handleToken, controller.searchPermission);
router.post('/permission/create', Middelware.handleToken, controller.createPermission);
router.get('/permission/list', Middelware.handleToken, controller.getAllPermission);
router.patch('/permission/update/:permissionCode', Middelware.handleToken, controller.updatePermissionByCode);
router.delete('/permission/delete/:permissionCode', Middelware.handleToken, controller.deletePermissionByCode);
router.post('/role-permission/search', Middelware.handleToken, controller.searchRolePermission);
router.get('/role-permission/list', Middelware.handleToken, controller.getAllRolePermission);
router.post('/role-permission/create', Middelware.handleToken, controller.createRolePermission);
router.post('/role-permission/create/bulk', Middelware.handleToken, controller.bulkCreateRolePermission);
router.patch('/role-permission/update/:rpId', Middelware.handleToken, controller.updateRolePermissionById);
router.delete('/role-permission/delete/:rpId', Middelware.handleToken, controller.deleteRolePermissionById);
async function AuthType(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { grant_type } = req.body
    switch (grant_type) {
      case 'password': controller.loginWithUsernamePassword(req, res, next)
        break;
      case 'refresh_token': controller.loginWithRefreshToken(req, res, next)
        break;
      case 'google': controller.loginWithGoogle(req, res, next)
        break;
      case 'line': controller.loginWithLine(req, res, next)
        break;
      default: throw Error('Invalid Grant Type')
    }
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }

}
async function Verify(req: express.Request, res: express.Response, next: express.NextFunction) {
  let token = ''
  if (req.method === 'GET') {
    token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : ''
  } else if (req.method === 'POST') {
    token = req.body.token
  }
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
export default router;