import * as express from 'express';
import * as morgan from 'morgan';
import * as compression from "compression";
import * as bodyParser from "body-parser";
import oauth from './routers/auth.router'
import users from './routers/users.router'
import role from './routers/role.router'
import client from './routers/client.router'
import { IError } from './common/errorHandle';
import config from '../config'
import * as _ from 'lodash'
import { ERROR_CODE, HTTP_CODE } from './common/constants/ErrorCode';
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const port = process.env.PORT || config.url.port
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: '1.0.0',
      title: 'Simple Auth API',
      description: 'API Information And Spec',
      contact: {
        name: 'Amazing Developer'
      }
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header'
      }
    },
    servers: [
      {
        "url": `http://localhost:${port}`,
        "description": "Development server"
      },
      {
        "url": `http://localhost:5000`,
        "description": "Stage server"
      }
    ],
  },
  apis: ['app.js', './src/routers/*.ts', './swagger/*.yaml']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();
app.use(morgan('dev'))
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.json({ body: JSON.stringify(req.query), param: JSON.stringify(req.params) })
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//app.use('/api/v1', oauth)
app.use('/api/v1', users)
// app.use('/api/v1', role)
// app.use('/api/v1', client)
app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (Array.isArray(err)) {
    // Custom Error format [body, statusCode]
    const [body, status] = err;
    res.status(status).json(body);
  } else {
    const statusCode = err.status || 500;
    const errorCode = _.find(HTTP_CODE, { statusCode: statusCode })
    const errRes: IError = {
      statusCode: statusCode,
      errorMessage: err.message,
      errorCode: errorCode ? errorCode.errorCode : 'Internal Server Error'
    }
    res.status(statusCode).json(errRes);
  }
});
export default app;

