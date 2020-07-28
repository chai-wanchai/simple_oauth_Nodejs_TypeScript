import JWT from '../common/jwt'
import * as bcrypt from 'bcryptjs'
import * as _ from 'lodash'
import { CommonError, ErrorHandle } from '../common/errorHandle'
import dbService, { dbAuth } from '../service/dbService'
import { Op } from 'sequelize'
import { IClient } from '../@types/client';
import { User } from '../model/Auth/User'
import { Client } from '../model/Auth/Client'
import { Token } from '../model/Auth/Token'
export class AuthManager {
	decodePassword(password: string, hashPassword: string) {
		const result = bcrypt.compareSync(password, hashPassword)
		if (result) {
			return result
		} else {
			const error = new CommonError()
			error.setErrorByCode('PASSWORD_INVALID')
			throw error
		}
	}
	encodePassword(password: string) {
		const hashPassword = bcrypt.hashSync(password, 10)
		return hashPassword
	}
	encryptData(userPayload: any) {
		const { password } = userPayload
		if (password) {
			userPayload.password = this.encodePassword(password)
		}
		return userPayload
	}
	async getTokenResult(usersData: User, client: Client) {
		const tokenResult = await dbAuth.token.createUserToken({ is_active: true, user: { user_id: usersData.user_id } })
		const payloadAccesstoken = {
			...this.selectPayloadAccesstoken(usersData),
			jti: tokenResult.token_id,
			sub: usersData.user_id,
			typ: 'access_token',
		}
		const payloadRefreshtoken = {
			jti: tokenResult.refresh_token,
			sub: usersData.user_id,
			typ: 'refresh_token'
		}
		const accessToken = JWT.encodeToken(payloadAccesstoken)
		const refreshToken = JWT.encodeToken(payloadRefreshtoken, { expiresIn: "7d" })
		const result = {
			access_token: accessToken,
			token_type: 'Bearer',
			refresh_token: refreshToken
		}
		return result
	}
	async checkRefreshToken(refreshToken: string) {
		try {
			const token = JWT.verifyToken(refreshToken)
			if (token.typ === 'refresh_token') {
				const tokenResult = await dbAuth.token.findActiveRefreshToken(token.jti)
				if (tokenResult) {
					this.revokeToken(token.jti)
					const userInfo = await dbAuth.users.findUserByEmail(token.uid)
					const client = await dbAuth.client.findById(token.client_id)
					return this.getTokenResult(userInfo, client)
				} else {
					const error = new CommonError()
					error.setErrorByCode('TOKEN_REVOKE')
					throw error
				}
			} else {
				throw Error('Refresh Token Not Valid')
			}
		} catch (error) {
			const err = new ErrorHandle(error)
			if (err.getError().errorCode === 'TokenExpiredError') {
				const token = JWT.decodeToken(refreshToken) as any
				this.revokeToken(token.jti)
			}
			throw err
		}

	}
	async revokeToken(tokenId: string) {
		const tokenResult = await dbAuth.token.updateUserTokenByTokenId(tokenId, { is_active: false })
		return tokenResult
	}
	selectPayloadAccesstoken(userPayload: any) {
		const selectField: any = ['email', 'uid', 'displayName', 'userId']
		const payload = _.pick(userPayload, selectField)
		return payload
	}
}
export default new AuthManager()