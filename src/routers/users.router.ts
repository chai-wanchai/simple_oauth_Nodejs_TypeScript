import * as express from 'express';
import Middelware from '../manager/Middleware'
import { registerUser } from '../controller/RegisterController';
import UserValidataion from '../validation/UserValidate';
export const router = express.Router();

router.get('/users/profile', Middelware.handleToken, getuser);
router.post('/users/register', UserValidataion.UserRegister, registerUser)
function getuser(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.json(res.locals)
}
export default router;