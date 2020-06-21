import * as Joi from '@hapi/joi'
import * as _ from 'lodash'
import { CommonError } from '../common/errorHandle';

export function commonValidation(schema: Joi.SchemaMap, data: any,skipUnknowKey:boolean = false) {
  const result = Joi.object(schema).unknown(skipUnknowKey).validate(data)
  if (result.error) {
    const msg = result.error.message.replace(/"/g, '')
    let data: any = _.find(result.error.details)
    if (data) {
      data = data.context
    }
    const error = new CommonError()
    error.setCustomError(400, msg, result.error.name, data)
    throw error
  } else {
    return result.value
  }
}