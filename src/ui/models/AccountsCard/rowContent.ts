import { RBACRoleRecord } from "lisk-rbac/dist/schemas";

export class AccountsRowContent {
  public address: string;
  public roleAssignments: { [role: string]: boolean } = {};
  public roleAssignmentsArray: boolean[] = [];

  public constructor(
    accountRoles: string[],
    address: string,
    roles: RBACRoleRecord[]
  ) {
    this.address = address;
    for (const role of roles) {
      this.roleAssignments[role.id] = !!accountRoles.find(x => x === role.id);
      this.roleAssignmentsArray.push(!!accountRoles.find(x => x === role.id))
    }
  }
}

export interface AccountRolesContent {
  roles: RBACRoleRecord[];
  accountRows: AccountsRowContent[];
}