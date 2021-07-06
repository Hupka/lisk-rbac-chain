import { RBACPermissionRecord, RBACRoleRecord, RoleAccounts } from '../rbac_db'

export class RoleContent {
  public roleRecord: RBACRoleRecord;
  public directPermissions: RBACPermissionRecord[];
  public inheritedPermissions: RBACPermissionRecord[];
  public roleAccounts: RoleAccounts;
  public ancestryRoles: RBACRoleRecord[] = [];

  public constructor(
    roleRecord: RBACRoleRecord,
    roles: RBACRoleRecord[],
    permissions: RBACPermissionRecord[],
    roleAccounts: RoleAccounts
  ) {
    this.roleRecord = roleRecord;
    this.roleAccounts = roleAccounts;

    this.directPermissions = [...permissions.filter(elem => elem.associatedRoleIds.find(x => x === this.roleRecord.id))];
    this.inheritedPermissions = [...permissions.filter(elem => !elem.associatedRoleIds.find(x => x === this.roleRecord.id))];

    for (const ancestor of roleRecord.inheritance) {
      const role = roles.find(elem => elem.id === ancestor)
      if (!role) {
        continue;
      }
      this.ancestryRoles.push(role)
    }
  }
}