/* eslint-disable arrow-body-style */
import { RBACPermissionRecord, RBACRoleRecord } from "lisk-rbac/dist/schemas";

export const getRole = async (roleId: string): Promise<RBACRoleRecord> => {
  const result = await fetch(`http://localhost:4000/rbac/roles/${roleId}/?fields=full`)

  const body: RBACRoleRecord = await result.json() as RBACRoleRecord;

  return body;
}

export const getRoles = async (): Promise<RBACRoleRecord[]> => {
  const result = await fetch(`http://localhost:4000/rbac/roles?fields=full`)

  const body: RBACRoleRecord[] = await result.json() as RBACRoleRecord[];

  return body;
}

export const getRolePermissions = async (roleId: string): Promise<RBACPermissionRecord[]> => {
  const result = await fetch(`http://localhost:4000/rbac/roles/${roleId}/permissions?fields=full`)

  const body: RBACPermissionRecord[] = await result.json() as RBACPermissionRecord[];

  return body;
}

export const getRoleAccounts = async (roleId: string): Promise<[{ address: string }]> => {
  const result = await fetch(`http://localhost:4000/rbac/roles/${roleId}/accounts`)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: [{ address: string }] = await result.json();

  return body;
}