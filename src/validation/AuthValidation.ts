import * as Joi from '@hapi/joi'
import { commonValidation } from '../common/validation'
import { Request, Response, NextFunction } from 'express';
import { CommonError, ErrorHandle } from '../common/errorHandle';
export const schemaAuth: Joi.SchemaMap = {
  grant_type: Joi.string().required().valid('password', 'refresh_token', 'line', 'google').error(new Error('Invalid Grant Type')), // password,refresh_token,line,google
  password: Joi.string().when('grant_type', { is: 'password', then: Joi.required(), otherwise: Joi.forbidden() }),
  username: Joi.string().when('grant_type', { is: 'password', then: Joi.required(), otherwise: Joi.forbidden() }),
  refresh_token: Joi.string().when('grant_type', { is: 'refresh_token', then: Joi.required(), otherwise: Joi.forbidden() }),
  access_token: Joi.string().when('grant_type', { is: Joi.valid('line', 'google'), then: Joi.required(), otherwise: Joi.forbidden() })
};

export function AuthValidation(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = commonValidation(schemaAuth, req.body)
    next()
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
