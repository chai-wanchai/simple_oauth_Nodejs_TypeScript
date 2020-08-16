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
import { Role } from '../model/Auth/Role'
import { RolePermission } from '../model/Auth/RolePermission'
import { IToken } from '../@types/token'
import { IPage } from '../@types/search'
import { Permission } from '../model/Auth/Permission'
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
	async searchRole(paging: IPage, criteria: any) {
    const result = await dbAuth.role.searchRole(paging, criteria);
    return result;
  }
  async getRoleList() {
    const result = await dbAuth.role.getRoleList();
    return result;
  }
  async createRole(data: Role, payload: IToken) {
    data.created_by = payload.sub;
    data.updated_by = payload.sub;
    const result = await dbAuth.role.createRole(data);
    return result.raw[0] || result.raw;
  }
  async updateRole(role_id: string, data: Role, payload: IToken) {
    data.updated_by = payload.sub;
    const result = await dbAuth.role.updateRoleById(parseInt(role_id, 10), data);
    return result;
  }
  async deleteRole(role_id: string, payload: IToken) {
    let data: Role = { deleted_by: payload.sub };
    await dbAuth.role.updateRoleById(parseInt(role_id, 10), data);
    const result = await dbAuth.role.deleteRoleById(parseInt(role_id, 10));
    return result;
  }
  async searchPermission(paging: IPage, criteria: any) {
    const result = await dbAuth.role.searchPermission(paging, criteria);
    return result;
  }
  async getPermissionList() {
    const result = await dbAuth.role.getPermissionList();
    return result;
  }
  async createPermission(data: Permission, payload: IToken) {
    data.created_by = payload.sub;
    data.updated_by = payload.sub;
    const result = await dbAuth.role.createPermission(data);
    return result.raw[0] || result.raw;
  }
  async updatePermission(permissionCode: string, data: Permission, payload: IToken) {
    data.updated_by = payload.sub;
    const result = await dbAuth.role.updatePermissionByCode(permissionCode, data);
    return result;
  }
  async deletePermission(permissionCode: string, payload: IToken) {
    let data: Permission = { deleted_by: payload.sub };
    await dbAuth.role.updatePermissionByCode(permissionCode, data);
    const result = await dbAuth.role.deletePermissionByCode(permissionCode);
    return result;
  }
  async searchRolePermission(paging: IPage, criteria: any) {
    const result = await dbAuth.role.searchRolePermission(paging, criteria);
    return result;
  }
  async getRolePermissionByRoleId(roleId: string) {
    const result = await dbAuth.role.getRolePermissionByRoleId(parseInt(roleId, 10));
    return result;
  }
  async getRolePermissionList() {
    const result = await dbAuth.role.getRolePermissionList();
    return result;
  }
  async createRolePermission(data: RolePermission, payload: IToken) {
    data.created_by = payload.sub;
    data.updated_by = payload.sub;
    data.permission = {
      permission_code: data.permission_code
    };
    data.role = {
      role_id: data.role_id
    };
    const result = await dbAuth.role.createRolePermission(data);
    return result.raw;
  }
  async bulkCreateRolePermission(data: RolePermission[], payload: IToken) {
    let newData = data.map(item => {
      item.created_by = payload.sub;
      item.updated_by = payload.sub;
      item.permission = {
        permission_code: item.permission_code
      };
      item.role = {
        role_id: item.role_id
      };
      return item;
    })
    const result = await dbAuth.role.createRolePermission(newData);
    return result.raw;
  }
  async updateRolePermission(rolePermissionCode: string, data: RolePermission, payload: IToken) {
    data.updated_by = payload.sub;
    if ('permission_code' in data) {
      data.permission = {
        permission_code: data.permission_code
      };
    }
    if ('role_id' in data) {
      data.role = {
        role_id: data.role_id
      };
    }
    const result = await dbAuth.role.updateRolePermissionById(parseInt(rolePermissionCode, 10), data);
    return result;
  }
  async deleteRolePermission(id: string, payload: IToken) {
    let data: RolePermission = { deleted_by: payload.sub };
    await dbAuth.role.updateRolePermissionById(parseInt(id, 10), data);
    const result = await dbAuth.role.deleteRolePermissionById(parseInt(id, 10));
    return result;
  }
}
export default new AuthManager()