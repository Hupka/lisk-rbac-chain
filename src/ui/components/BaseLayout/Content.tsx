/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { AccountCard } from '../AccountCard/AccountCard';
// import { RoleCard } from '../RoleCard/RoleCard';
import { RolesCard } from '../RolesCard/RolesCard';
import { Dashboard } from '../Dashboard/_dashboard';
/* eslint-disable no-console */
export const Content: React.FC<{ category: string }> = props => {

	// const [closeRoleCard, setCloseRoleCard] = useState(false);
	// const [roleId, setRoleId] = useState('1');

	

	switch (props.category) {
		case 'roles':
			console.log("clicked switch")
			return <RolesCard />;
		case 'accounts':
		
			return <AccountCard></AccountCard>
		default:
		
			return <Dashboard></Dashboard>;
	}
};
