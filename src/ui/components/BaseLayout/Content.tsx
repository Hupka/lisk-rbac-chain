/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */

import { AccountsCard } from '../Accounts/AccountsCard';
import { Dashboard } from '../Dashboard/Dashboard';
import { RolesCard } from '../RolesCard/RolesCard';

export const Content: React.FC<{ category: string }> = props => {
	switch (props.category) {
		case 'roles':
			console.log('clicked switch');
			return <RolesCard />;
		case 'accounts':
			return <AccountsCard />;
		default:
			return <Dashboard />;
	}
};
