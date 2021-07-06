export class RowContent {
  public roleId: string;
  public roleName: string;
  public description: string;
  public permissionCount: number;
  public accountCount: number;
  public minAccounts: number;

  public constructor(
    roleId: string,
    roleName: string,
    description: string,
    permissionsCount: number,
    accountCount: number,
    minAccounts: number,

  ) {
    this.roleId = roleId;
    this.roleName = roleName;
    this.description = description;
    this.permissionCount = permissionsCount;
    this.accountCount = accountCount;
    this.minAccounts = minAccounts;
  }
}