/* eslint-disable arrow-body-style */
/* eslint-disable  */

import { RBACPermissionRecord, RBACRoleRecord } from "lisk-rbac/dist/schemas";

export const getRole = async (roleId: string, url: string): Promise<RBACRoleRecord> => {
  const result = await fetch(url + `/rbac/roles/${roleId}/?fields=full`)

  const body: RBACRoleRecord = await result.json() as RBACRoleRecord;

  return body;
}

export const getRoles = async (url: string): Promise<RBACRoleRecord[]> => {
  const result = await fetch(url + `/rbac/roles?fields=full`)

  const body: RBACRoleRecord[] = await result.json() as RBACRoleRecord[];

  return body;
}

export const getRolePermissions = async (roleId: string, url: string): Promise<RBACPermissionRecord[]> => {
  const result = await fetch(url + `/rbac/roles/${roleId}/permissions?fields=full`)

  const body: RBACPermissionRecord[] = await result.json() as RBACPermissionRecord[];

  return body;
}

export const getRoleAccounts = async (roleId: string, url: string): Promise<[{ address: string }]> => {
  const result = await fetch(url + `/rbac/roles/${roleId}/accounts`)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: [{ address: string }] = await result.json();

  return body;
}

export const getAccountsRoles = async (address: string, url: string): Promise<RBACRoleRecord[]> => {
  const result = await fetch(url + `/rbac/accounts/${address}/roles`)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: RBACRoleRecord[] = await result.json() as RBACRoleRecord[];

  return body;
}

export const getAccountPermissions = async (address: string, url: string): Promise<RBACPermissionRecord[]> => {
  const result = await fetch(url + `/rbac/accounts/${address}/permissions?fields=full`)

  const body: RBACPermissionRecord[] = await result.json() as RBACPermissionRecord[];

  return body;
}

export const hasPermission = async (address: string, resource: string, operation: string, url: string): Promise<boolean> => {
  const result = await fetch(url + `/rbac/accounts/${address}/hasPermission`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      resource, operation
    }) // body data type must match "Content-Type" header
  })

  const body: boolean = await result.json() as boolean;

  return body;
}

export const fetchAccountInfo = async (address: string, url: string) => {
  return fetch(url + `/api/accounts/${address}`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchNodeInfo = async (url: string) => {
  return fetch(url + "/api/node/info")
    .then((res) => res.json())
    .then((res) => res.data);
};

export const sendTransactions = async (tx, url: string) => {
  return fetch(url + "/api/transactions", {
    method: "POST",
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(tx),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};
