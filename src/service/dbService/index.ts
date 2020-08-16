import userService from "./Auth/user";
import clientService from "./Auth/client";
import tokenService from "./Auth/token";
import roleService from "./Auth/role";

export const dbAuth = {
	users: userService,
	token: tokenService,
	client: clientService,
	role: roleService
}
export const dbService = {
	auth: dbAuth
};

export default dbService;