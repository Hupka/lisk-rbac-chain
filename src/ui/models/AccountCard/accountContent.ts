import { RBACPermissionRecord, RBACRoleRecord } from "../rbac_db";

export class AccountContent {
  public address: string;
  public roles: RBACRoleRecord[];
  public permissions: RBACPermissionRecord[];

  public constructor(
    address: Buffer,
    roles: RBACRoleRecord[],
    permissions: RBACPermissionRecord[]
  ) {
    this.address = Buffer.from(address).toString('hex');
    this.roles = roles;
    this.permissions = permissions;
  }
}