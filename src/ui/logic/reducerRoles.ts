/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */

import { RBACPermissionRecord, RBACRoleRecord } from "lisk-rbac/dist/schemas";
import * as api from '../../app/plugins/lisk_rbac_ui/api/index';
import { AccountContent, AccountRolesContent, AccountsRowContent, RoleContent, RowContent } from "../models";

export const reducerRolesList = async (url: string): Promise<RowContent[]> => {

  const allRoles: RBACRoleRecord[] = await api.getRoles(url);

  const roles: RowContent[] = [];
  for (const role of allRoles) {
    const rolePermissions = await api.getRolePermissions(role.id, url);
    const roleAccounts = await api.getRoleAccounts(role.id, url);
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

export const reducerRole = async (roleId: string, url: string): Promise<RoleContent> => {

  const roleItem: RBACRoleRecord = await api.getRole(roleId, url);
  const roleItems: RBACRoleRecord[] = await api.getRoles(url);
  const rolePermissionItems: RBACPermissionRecord[] = await api.getRolePermissions(roleId, url);
  const roleAccounts: [{ address: string }] = await api.getRoleAccounts(roleId, url);

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

export const reducerAccountsList = async (url: string): Promise<AccountRolesContent> => {
  const roleItems: RBACRoleRecord[] = await api.getRoles(url);

  // get a list of all addresses
  const accountsWithRoles: { [address: string]: string } = {};
  for (const role of roleItems) {
    const roleAccounts = await api.getRoleAccounts(role.id, url);

    for (const account of roleAccounts) {
      accountsWithRoles[account.address] = account.address;
    }
  }

  const rowItemContent: AccountsRowContent[] = [];
  for (const address in accountsWithRoles) {
    if (Object.prototype.hasOwnProperty.call(accountsWithRoles, address)) {
      const addressString = accountsWithRoles[address];

      const accountRoles = await api.getAccountsRoles(addressString, url);

      rowItemContent.push(new AccountsRowContent(
        accountRoles.map(x => x.id),
        addressString,
        roleItems
      ))
    }
  }

  const result: AccountRolesContent = {
    roles: roleItems,
    accountRows: rowItemContent
  }

  return (result)
}

export const reducerAccountContent = async (address: string, url: string): Promise<AccountContent> => {

  const accountRoles = await api.getAccountsRoles(address, url);
  const accountPermissions = await api.getAccountPermissions(address, url);

  return new AccountContent(
    Buffer.from(address, 'hex'),
    accountRoles,
    accountPermissions
  );
}