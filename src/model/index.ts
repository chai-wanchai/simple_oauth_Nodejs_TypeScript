import { Sequelize } from 'sequelize'
import { userFactory } from './Auth/User'
import { roleFactory } from './Auth/Role'
import { tokenFactory } from './Auth/Token'
import { permissionFactory } from './Auth/Permission'
import { clientFactory } from './Auth/Client'
import { clientConfigFactory } from "./Auth/ClientConfig";
import { systemConfigFactory } from "./Auth/SystemConfig";

export const createAuthModel = (sequelize: Sequelize) => {
  const users = userFactory(sequelize);
  const userToken = tokenFactory(sequelize);
  const client = clientFactory(sequelize);
  const role = roleFactory(sequelize);
  const permission = permissionFactory(sequelize);
  const rolePermission = roleFactory(sequelize);
  const systemConfig = systemConfigFactory(sequelize);
  const clientConfig = clientConfigFactory(sequelize);
  const models = {
    users,
    userToken,
    client,
    role,
    permission,
    rolePermission,
    clientConfig,
    systemConfig
  }
  return models;
}


export default {
  auth : createAuthModel
}