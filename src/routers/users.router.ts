import * as express from 'express';
import Middelware from '../manager/Middleware'
import * as userController from '../controller/UserController';
import UserValidataion from '../validation/UserValidate';
export const router = express.Router();

router.get('/user/profile', Middelware.handleToken, userController.getUser);
router.post('/user/profile', Middelware.handleToken, userController.getUser);
router.patch('/user/profile/update/:user_id', Middelware.handleToken, userController.updateUser);
router.delete('/user/profile/delete/:user_id', Middelware.handleToken, userController.getUser);
router.post('/user/register', UserValidataion.UserRegister, userController.registerUser)
router.get('/user/list', Middelware.handleToken, userController.listUser);

export default router;