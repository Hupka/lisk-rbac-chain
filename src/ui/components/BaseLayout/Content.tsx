/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import { AccountCard } from '../AccountCard/AccountCard';
import { RoleCard } from '../RoleCard/RoleCard';
import { RolesCard } from '../RolesCard/RolesCard';

export const Content: React.FC<{ category: string }> = props => {
	const [openRole, setOpenRole] = useState(false);
	const [roleId, setRoleId] = useState('1');

	const openRoleCard = (id: string) => {
		// eslint-disable-next-line no-console
		console.log(id);
		if (id) {
			setOpenRole(true);
			setRoleId(id);
		}
	};

	switch (props.category) {
		case 'roles':
			if (openRole) {
				return <RoleCard roleId={roleId} />;
			}
			return <RolesCard onOpenRoleCard={openRoleCard} />;
		case 'accounts':
			return <p></p>;
		default:
			return <AccountCard></AccountCard>;
	}
};
