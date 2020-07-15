import * as express from 'express';
import { loginWithLine, loginWithGoogle, loginWithUsernamePassword, loginWithRefreshToken } from '../controller/AuthController'
import JWT from '../common/jwt'
import { ErrorHandle } from '../common/errorHandle';
import { AuthValidation } from '../validation/AuthValidation';
import Middelware from '../manager/Middleware';
export const router = express.Router();

// router.post('/oauth/authorize', loginWithRefreshToken);
// router.get('/oauth/verify', Middelware.handleClientFromeRequet, Verify);
router.post('/oauth/token', Middelware.handleClientFromeRequet, AuthValidation, AuthType);
async function AuthType(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { grant_type } = req.body
    switch (grant_type) {
      case 'password': loginWithUsernamePassword(req, res, next)
        break;
      case 'refresh_token': loginWithRefreshToken(req, res, next)
        break;
      case 'google': loginWithGoogle(req, res, next)
        break;
      case 'line': loginWithLine(req, res, next)
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