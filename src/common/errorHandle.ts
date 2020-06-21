import { Response, Request, NextFunction } from 'express'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { DatabaseError } from 'sequelize'
import { ERROR_CODE } from './constants/ErrorCode';
export interface IError {
  statusCode: number,
  errorMessage: string | null,
  errorCode: string | null,
  data?: any
}
export class CommonError {
  private error: IError = {
    statusCode: 500,
    errorMessage: null,
    errorCode: null,
    data: {}
  }
  public ERROR_CODE = ERROR_CODE

  public setCustomError(statusCode?: number, errorMessage?: string, errorCode?: string, data?: any) {
    if (statusCode) {
      this.error.statusCode = statusCode
    }
    if (errorCode) {
      this.error.errorCode = errorCode
    }
    if (errorMessage) {
      this.error.errorMessage = errorMessage
    }
    if (data) {
      this.error.data = data
    }
  }  
  public setErrorByCode(errorCode: string, data?: any) {
    if (errorCode in ERROR_CODE) {
      this.error = ERROR_CODE[errorCode]
      this.error.data = data
    } else {
      this.error = ERROR_CODE.DEFUALT
      if (data) {
        this.error.data = data
      } else {
        this.error.data = { code: errorCode }
      }
    }
  }
  public getError() {
    return this.error
  }
  public sendErrorResponse(res: Response, statusCode?: number) {
    if (statusCode) {
      res.status(statusCode).json(this.error)
    } else {
      res.status(this.error.statusCode).json(this.error)
    }
  }
}
export class ErrorHandle {
  private error: IError = {
    statusCode: 500,
    errorMessage: null,
    errorCode: null,
    data: {}
  }
  constructor(ErrorData: any) {
    this.handleError(ErrorData)
  }
  public getError():IError{
    return this.error
  }
  public handleError(ErrorData: any) {
    if (ErrorData.isAxiosError) {
      if (ErrorData.response) {
        this.error.statusCode = ErrorData.response.status
        this.error.data = ErrorData.response ? ErrorData.response.data : ErrorData.response
      }
    } else if (ErrorData instanceof TypeError) {
      this.error.errorMessage = ErrorData.message
      this.error.errorCode = ErrorData.name.toUpperCase()
    } else if (ErrorData instanceof JsonWebTokenError) {
      this.error.statusCode = 401
      this.error.errorMessage = ErrorData.message
      if (ErrorData instanceof TokenExpiredError) {
        this.error.statusCode = 403
        this.error.errorCode = ErrorData.name
        this.error.errorMessage = 'Token Expired'
      }
    } else if (ErrorData instanceof DatabaseError) {
      this.error.errorCode = ErrorData.name
      this.error.errorMessage = ErrorData.message
    } else if (ErrorData instanceof CommonError) {
      this.error = ErrorData.getError()
    } else if(ErrorData instanceof ErrorHandle){
      this.error = ErrorData.getError()
    }
    else if ('message' in ErrorData) {
      this.error.errorMessage = ErrorData.message
    }
  }
  public sendErrorResponse(res: Response, statusCode?: number) {
    if (statusCode) {
      res.status(statusCode).json(this.error)
    } else {
      res.status(this.error.statusCode).json(this.error)
    }
  }
}