import { AccountContent, HeaderContent } from "../../models"
import { Card } from "../UI/Card"
import { CardHeader } from "../UI/CardHeader"
import { PermissionsTable } from "../RoleCard/PermissionsTable"

export const AccountCard = () => {

  const content: AccountContent = new AccountContent(
    Buffer.from("9cabee3d27426676b852ce6b804cb2fdff7cd0b5", 'hex'),
    [
      {
        id: "1",
        name: "rbac_admin",
        description: "Role has permissions to change the RBAC ruleset.",
        transactionId: Buffer.from("genesis", "utf-8"),
        inheritance: [],
        lifecycle: "active",
        minAccounts: 1
      }
    ],
    [
      {
        id: "1",
        associatedRoleIds: ["1"],
        resource: "roles",
        operation: "create",
        description: "Grants permission to create new roles.",
        transactionId: Buffer.from("genesis", "utf-8")
      },
      {
        id: "2",
        associatedRoleIds: ["1"],
        resource: "roles",
        operation: "update",
        description: "Grants permission to update existing roles. This includes adding and removing permissions from roles.",
        transactionId: Buffer.from("genesis", "utf-8")
      },
      {
        id: "3",
        associatedRoleIds: ["1"],
        resource: "roles",
        operation: "delete",
        description: "Grants permission to delete existing roles.",
        transactionId: Buffer.from("genesis", "utf-8")
      }
    ]
  )

  return (
    <Card>
      <CardHeader headerContent={new HeaderContent("Account Address".concat(": ", content.address))} />
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Assigned Roles</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{content.roles.map(x => x.name).join(', ')}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Direct Permissions</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <PermissionsTable permissions={content.permissions} />
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  )
}