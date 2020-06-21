import * as Joi from '@hapi/joi'
import { commonValidation } from '../common/validation'
import { Request, Response, NextFunction } from 'express';
import { CommonError, ErrorHandle } from '../common/errorHandle';
import { IClient } from '../types/client';

export const schemaClient: Joi.SchemaMap = {
  client_id: Joi.string().required(),
  client_secret: Joi.string().required()
}
export const schemaClientRegister: Joi.SchemaMap = {
  clientName: Joi.string().required(),
  description: Joi.string().optional()
}

export function ClientValidation(req: Request, res: Response, next: NextFunction) {
  try {
    req.headers = commonValidation(schemaClient, req.headers, true)
    const { client_id, client_secret } = req.headers
    res.locals.client = {
      clientId: client_id,
      clientSecret: client_secret
    } as IClient
    next()
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}

export function RegisterClientValidation(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = commonValidation(schemaClientRegister, req.body)
    next()
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}