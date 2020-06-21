export const ERROR_CODE = {
	DEFUALT: {
		statusCode: 500,
		errorMessage: 'Unknow Error',
		errorCode: 'UNKNOW_ERROR'
	},
	REQUIRE_AUTH: {
		statusCode: 401,
		errorMessage: 'Require Authorization',
		errorCode: 'REQUIRE_AUTHORIZATION'
	},
	PASSWORD_INVALID: {
		statusCode: 400,
		errorMessage: 'Invalid Password',
		errorCode: 'PASSWORD_INVALID'
	},
	USER_NOT_FOUND: {
		statusCode: 400,
		errorMessage: "User Not Found",
		errorCode: "USER_NOT_FOUND"
	},
	GRANT_TYPE_INVALID:{
		statusCode: 400,
		errorMessage: "Grant Type Invalid",
		errorCode: "GRANT_TYPE_INVALID"
	},
	TOKEN_REVOKE:{
		statusCode: 401,
		errorMessage: "Token is revoke",
		errorCode: "TOKEN_REVOKE"
	},
	INVALID_CLIENT:{
		statusCode: 401,
		errorMessage: "Client not Valid",
		errorCode: "INVALID_CLIENT"
	}
}