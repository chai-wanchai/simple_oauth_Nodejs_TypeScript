// import client from './client'
// import role from './role'
// import token from './token'
// import permission from './permission'
// import user, { UserModelType } from './user'
// import Database from '../../common/database'

// /// ------------------- Relationship One-To-Many -----------------------------////
// user.hasMany(token, { foreignKey: 'userId' });
// token.belongsTo(user, { foreignKey: 'userId' })
// /// ------------------- End Relationship One-To-Many -----------------------------////

// /// ------------------- Relationship Many-To-Many -----------------------------////
// const rolePermission = <UserModelType>Database.connection.define('RolePermission', {}, { tableName: 'RolePermission' });
// role.belongsToMany(permission, { through: rolePermission, foreignKey: 'roleId' });
// permission.belongsToMany(role, { through: rolePermission, foreignKey: 'permissionId' })
// const userRole = <UserModelType>Database.connection.define('UsersRole', {}, { tableName: 'UsersRole' });
// user.belongsToMany(role, { through: userRole, foreignKey: 'userId' });
// role.belongsToMany(user, { through: userRole, foreignKey: 'roleId' });
// const userClient = <UserModelType>Database.connection.define('UsersClient', {}, { tableName: 'UsersClient' });
// user.belongsToMany(client, { through: userClient, foreignKey: 'userId' });
// client.belongsToMany(user, { through: userClient, foreignKey: 'clientId' });
// /// ------------------- End Relationship Many-To-Many -----------------------------////
// export const dbModel = {
//   client: client,
//   role: role,
//   rolePermission: rolePermission,
//   token: token,
//   users: user,
//   userRole: userRole,
//   userClient: userClient,
//   permission: permission
// }
// export default dbModel
import Database from '../../common/database'
import { createAuthModel } from '../../model'
export const dbModelAuth = createAuthModel(Database.connection)
export default { dbModelAuth }