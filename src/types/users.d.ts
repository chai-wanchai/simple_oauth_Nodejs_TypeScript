export interface UserAttributes {
  userId?: number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: Date;
  userName?: string;
  email: string | null;
  pictureUrl?: string;
  password?: string;
  isActive?: boolean;
  uid?: string;
  createdAt?: Date;
  updatedAt?: Date;
  idp?: string
}

export interface UserClientAttributes {
  clientId: number,
  userId: number
}
export interface UserRoleAttributes {
  roleId: number,
  userId: number
}