import * as express from 'express';
import Middelware from '../manager/Middleware'
import { RegisterClientValidation, ClientValidation } from '../validation/ClientValidation';
import { getClientInformation, updateClient,deleteClient, getAllClient,registerClient } from '../controller/ClientController';
const router = express.Router();

router.get('/client', Middelware.handleClientFromeRequet, getClientInformation)
router.get('/client/search', ClientValidation, getAllClient)
router.post('/client', Middelware.handleToken, RegisterClientValidation, registerClient)
router.patch('/client', Middelware.handleToken, ClientValidation, updateClient)
router.delete('/client', Middelware.handleToken, ClientValidation, deleteClient)
export default router