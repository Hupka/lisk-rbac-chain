export interface RBACPermissionRecord {
  id: string;
  associatedRoleIds: string[];
  resource: string;
  operation: string;
  description: string;
  transactionId: Buffer;
}

export interface RBACRoleRecord {
  id: string;
  name: string;
  description: string;
  transactionId: Buffer;
  inheritance: string[];
  lifecycle: string;
  minAccounts: number;
}

export interface RBACAccountRoleItem {
  id: string;
  name: string;
}

export interface RBACAccountProps {
  rbac: {
    roles: RBACAccountRoleItem[];
  };
}

export interface RoleAccounts {
  id: string;
  addresses: Buffer[];
  lifecycle: string;
}