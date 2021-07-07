import { HTTPAPIPermissionRecord, HTTPAPIRoleRecord, RBACPermissionRecord } from "lisk-rbac/dist/schemas";
import * as api from '../../app/plugins/lisk_rbac_ui/api/index';
import { RBACRoleRecord, RoleContent, RowContent } from "../models";


export const reducerRolesList = async (): Promise<RowContent[]> => {

  const allRoles: HTTPAPIRoleRecord[] = await api.getRoles();

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
      0)
    )
  }

  return roles;
}

export const reducerRole = async (roleId: string): Promise<RoleContent> => {

  const roleItem: HTTPAPIRoleRecord = await api.getRole(roleId);
  const roleItems: HTTPAPIRoleRecord[] = await api.getRoles();
  const rolePermissionItems: HTTPAPIPermissionRecord[] = await api.getRolePermissions(roleId);
  const roleAccounts: [{ address: string }] = await api.getRoleAccounts(roleId);

  // eslint-disable-next-line no-console
  console.log(roleAccounts);

  const roleRecord: RBACRoleRecord = {
    id: roleItem.id,
    name: roleItem.name,
    description: roleItem.description,
    transactionId: Buffer.from(""),
    inheritance: [],
    lifecycle: "active",
    minAccounts: 1,
  }

  const rolePermissions: RBACPermissionRecord[] = rolePermissionItems.map(x => ({
    id: Math.random.toString(),
    associatedRoleIds: [],
    resource: x.resource,
    operation: x.operation,
    description: x.description,
    transactionId: Buffer.from(""),
  }))

  return new RoleContent(
    roleRecord,
    roleItems.map(x => ({
      id: x.id,
      name: x.name,
      description: x.description,
      transactionId: Buffer.from(""),
      inheritance: [],
      lifecycle: "active",
      minAccounts: 1,
    })),
    rolePermissions,
    {
      id: roleId,
      addresses: roleAccounts.map(x => Buffer.from(x.address, 'hex')),
      lifecycle: ""
    }
  );
}