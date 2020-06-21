import auth from './AuthManager';
import role from './RoleManager';
import user from './UserManager';
import client from './ClientManager';
const manager = {
  auth: auth,
  role: role,
  user: user,
  client: client
}
export default manager