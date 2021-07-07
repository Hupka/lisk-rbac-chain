/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */

import { AccountCard } from '../AccountCard/AccountCard';
import { Dashboard } from '../Dashboard/Dashboard';
import { RolesCard } from '../RolesCard/RolesCard';

export const Content: React.FC<{ category: string }> = props => {
	// const [closeRoleCard, setCloseRoleCard] = useState(false);
	// const [roleId, setRoleId] = useState('1');

	switch (props.category) {
		case 'roles':
			console.log('clicked switch');
			return <RolesCard />;
		case 'accounts':
			return <AccountCard></AccountCard>;
		default:
			return <Dashboard />;
	}
};
