import * as Joi from '@hapi/joi'
import { commonValidation } from '../common/validation'
import { Request, Response, NextFunction } from 'express';
import { CommonError, ErrorHandle } from '../common/errorHandle';

export const schemaUserRegister: Joi.SchemaMap = {
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  gender: Joi.string().uppercase(),
  dob: Joi.date(),
  uid: Joi.string().optional()
};
export class UserValidataion {
  public UserRegister(req: Request, res: Response, next: NextFunction){
    try {
      req.body = commonValidation(schemaUserRegister, req.body)
      next()
    } catch (error) {
      const err = new ErrorHandle(error)
      err.sendErrorResponse(res)
    }
  }
}
export default new UserValidataion()