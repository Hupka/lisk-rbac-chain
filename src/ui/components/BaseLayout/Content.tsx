import { AccountCard } from '../AccountCard/AccountCard';
import { RoleCard } from '../RoleCard/RoleCard';
import { RolesCard } from '../RolesCard/RolesCard';

export const Content: React.FC<{ category: string }> = props => {
	const openRoleCard = (roleId: string) => {
		// eslint-disable-next-line no-console
		console.log(roleId);
	};

	switch (props.category) {
		case 'roles':
			return <RolesCard onOpenRoleCard={openRoleCard} />;
		case 'accounts':
			return <RoleCard />;
		default:
			return <AccountCard></AccountCard>;
	}
};
