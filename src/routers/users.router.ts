import * as express from 'express';
import Middelware from '../manager/Middleware'
import { registerUser, getUser, updateUser } from '../controller/UserController';
import UserValidataion from '../validation/UserValidate';
export const router = express.Router();

router.get('/user/profile', Middelware.handleToken, getUser);
router.post('/user/profile', Middelware.handleToken, getUser);
router.patch('/user/profile/update/:user_id', Middelware.handleToken, updateUser);
router.delete('/user/profile/delete/:user_id', Middelware.handleToken, getUser);
router.post('/user/register', UserValidataion.UserRegister, registerUser)

export default router;