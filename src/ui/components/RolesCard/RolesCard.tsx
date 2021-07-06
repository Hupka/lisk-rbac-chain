import { HeaderContent, RowContent } from "../../models";
import { Card } from "../UI/Card";
import { CardHeader } from "../UI/CardHeader";
import { RolesTable } from "./RolesTable";

export const RolesCard: React.FC<{ onOpenRoleCard: (text: string) => void }> = (
  props
) => {
  const content: RowContent[] = [
    new RowContent(
      "1",
      "rbac_admin",
      "Role has permissions to change the RBAC ruleset.",
      3,
      3,
      1
    ),
    new RowContent(
      "2",
      "role_membership_admin",
      "Role has permissions to assign and remove roles from accounts.",
      3,
      14,
      1
    ),
    new RowContent(
      "3",
      "super_admin",
      "Role inherits permissions from the two roles rbac_admin and role_membership_admin.",
      7,
      1,
      1
    ),
  ];

  return (
    <Card>
      <CardHeader headerContent={new HeaderContent("Roles")} />
      <RolesTable onOpenRoleCard={props.onOpenRoleCard} rowContent={content} />
    </Card>
  );
};
