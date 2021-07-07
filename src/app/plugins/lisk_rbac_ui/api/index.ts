/* eslint-disable arrow-body-style */
import { HTTPAPIPermissionRecord } from "lisk-rbac/dist/schemas";
import { HTTPAPIRoleRecord } from "../../../../ui/models";

export const getRole = async (roleId: string): Promise<HTTPAPIRoleRecord> => {
  const result = await fetch(`http://localhost:4000/rbac/roles/${roleId}`)

  const body: HTTPAPIRoleRecord = await result.json() as HTTPAPIRoleRecord;

  return body;
}

export const getRoles = async (): Promise<HTTPAPIRoleRecord[]> => {
  const result = await fetch(`http://localhost:4000/rbac/roles`)

  const body: HTTPAPIRoleRecord[] = await result.json() as HTTPAPIRoleRecord[];

  return body;
}

export const getRolePermissions = async (roleId: string): Promise<HTTPAPIPermissionRecord[]> => {
  const result = await fetch(`http://localhost:4000/rbac/roles/${roleId}/permissions`)

  const body: HTTPAPIPermissionRecord[] = await result.json() as HTTPAPIPermissionRecord[];

  return body;
}

export const getRoleAccounts = async (roleId: string): Promise<[{ address: string }]> => {
  const result = await fetch(`http://localhost:4000/rbac/roles/${roleId}/accounts`)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: [{ address: string }] = await result.json();

  return body;
}