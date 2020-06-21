import express, { Request, Response, NextFunction } from 'express';
import compression from "compression";
import bodyParser from "body-parser";
import oauth from './routers/auth.router'
import users from './routers/users.router'
import role from './routers/role.router'
import client from './routers/client.router'
import { IError } from './common/errorHandle';
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Simple Auth API',
      description: 'API Information And Spec',
      contact: {
        name: 'Amazing Developer'
      }
    },
  },
  apis: ['app.js','./src/routers/*.ts','./swagger/*.yaml']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ body: JSON.stringify(req.query),param:JSON.stringify(req.params) })
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1',oauth)
app.use('/api/v1',users)
app.use('/api/v1',role)
app.use('/api/v1',client)
app.use('*', function(req, res){
  const err :IError ={
    statusCode: 404,
    errorMessage: `[ ${req.method} : ${req.baseUrl} ] is Not Found`,
    errorCode: 'NotFound'
  }
  res.status(404).json(err);
});

export default app;

