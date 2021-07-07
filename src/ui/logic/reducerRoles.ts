import { RBACPermissionRecord, RBACRoleRecord } from "lisk-rbac/dist/schemas";
import * as api from '../../app/plugins/lisk_rbac_ui/api/index';
import { RoleContent, RowContent } from "../models";

/* eslint-disable no-console */
export const reducerRolesList = async (): Promise<RowContent[]> => {

  const allRoles: RBACRoleRecord[] = await api.getRoles();

  const roles: RowContent[] = [];
  for (const role of allRoles) {
    const rolePermissions = await api.getRolePermissions(role.id);
    const roleAccounts = await api.getRoleAccounts(role.id);
    roles.push(new RowContent(
      role.id,
      role.name,
      role.description,
      rolePermissions.length,
      roleAccounts.length,
      role.minAccounts)
    )
  }

  return roles;
}

export const reducerRole = async (roleId: string): Promise<RoleContent> => {

  const roleItem: RBACRoleRecord = await api.getRole(roleId);
  const roleItems: RBACRoleRecord[] = await api.getRoles();
  const rolePermissionItems: RBACPermissionRecord[] = await api.getRolePermissions(roleId);
  const roleAccounts: [{ address: string }] = await api.getRoleAccounts(roleId);

  return new RoleContent(
    roleItem,
    roleItems,
    rolePermissionItems,
    {
      id: roleId,
      addresses: roleAccounts.map(x => Buffer.from(x.address, 'hex')),
      lifecycle: ""
    }
  );
}