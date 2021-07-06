import { HeaderContent, RoleContent } from "../../models";
import { Card } from "../UI/Card";
import { CardHeader } from "../UI/CardHeader";
import { AddressesTable } from "./AddressesTable";
import { PermissionsTable } from "./PermissionsTable";

export const RoleCard = () => {
  const content: RoleContent = new RoleContent(
    {
      id: "3",
      name: "super_admin",
      description:
        "Role inherits permissions from the two roles rbac_admin and role_membership_admin.",
      transactionId: Buffer.from("genesis", "utf-8"),
      inheritance: ["1", "2"],
      lifecycle: "active",
      minAccounts: 1,
    },
    [
      {
        id: "1",
        name: "rbac_admin",
        description: "Role has permissions to change the RBAC ruleset.",
        transactionId: Buffer.from("genesis", "utf-8"),
        inheritance: [],
        lifecycle: "active",
        minAccounts: 1,
      },
      {
        id: "2",
        name: "role_membership_admin",
        description:
          "Role has permissions to assign and remove roles from accounts.",
        transactionId: Buffer.from("genesis", "utf-8"),
        inheritance: [],
        lifecycle: "active",
        minAccounts: 1,
      },
      {
        id: "3",
        name: "super_admin",
        description:
          "Role inherits permissions from the two roles rbac_admin and role_membership_admin.",
        transactionId: Buffer.from("genesis", "utf-8"),
        inheritance: ["1", "2"],
        lifecycle: "active",
        minAccounts: 1,
      },
    ],
    [
      {
        id: "1",
        associatedRoleIds: ["1"],
        resource: "roles",
        operation: "create",
        description: "Grants permission to create new roles.",
        transactionId: Buffer.from("genesis", "utf-8"),
      },
      {
        id: "2",
        associatedRoleIds: ["1"],
        resource: "roles",
        operation: "update",
        description:
          "Grants permission to update existing roles. This includes adding and removing permissions from roles.",
        transactionId: Buffer.from("genesis", "utf-8"),
      },
      {
        id: "3",
        associatedRoleIds: ["1"],
        resource: "roles",
        operation: "delete",
        description: "Grants permission to delete existing roles.",
        transactionId: Buffer.from("genesis", "utf-8"),
      },
      {
        id: "4",
        associatedRoleIds: ["2"],
        resource: "role_membership",
        operation: "assign",
        description: "Grants permission to assign an account a role.",
        transactionId: Buffer.from("genesis", "utf-8"),
      },
      {
        id: "5",
        associatedRoleIds: ["2"],
        resource: "role_membership",
        operation: "remove",
        description: "Grants permission to remove a role from an account.",
        transactionId: Buffer.from("genesis", "utf-8"),
      },
      {
        id: "6",
        associatedRoleIds: ["3"],
        resource: "rulesets",
        operation: "setversion",
        description: "Grants permission to restore a previous ruleset version.",
        transactionId: Buffer.from("genesis", "utf-8"),
      },
    ],
    {
      id: "3",
      addresses: [
        Buffer.from("9cabee3d27426676b852ce6b804cb2fdff7cd0b5", "hex"),
        Buffer.from("463e7e879b7bdc6a97ec02a2a603aa1a46a04c80", "hex"),
      ],
      lifecycle: "active",
    }
  );

  return (
    <Card>
      <CardHeader
        headerContent={
          new HeaderContent(
            "Role".concat(": ", content.roleRecord.name),
            content.roleRecord.description
          )
        }
      />
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Role Id</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {content.roleRecord.id}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Lifecycle Status
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {content.roleRecord.lifecycle}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Ancestry Roles
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {content.ancestryRoles.map((x) => x.name).join(", ")}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Direct Permissions
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <PermissionsTable permissions={content.directPermissions} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Inherited Permissions
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <PermissionsTable permissions={content.inheritedPermissions} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Accounts</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <AddressesTable accounts={content.roleAccounts} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Minium Number of Accounts
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {content.roleRecord.minAccounts}
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
};
