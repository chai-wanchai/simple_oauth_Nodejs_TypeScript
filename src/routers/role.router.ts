import * as express from 'express';
import Middelware from '../manager/Middleware'
import { addRole, addClientRole } from '../controller/RoleController'
export const router = express.Router();

router.post('/role', Middelware.handleToken, addRole)
router.post('/role/client', Middelware.handleToken, addClientRole);
router.post('/permission',Middelware.handleToken)
export default router;