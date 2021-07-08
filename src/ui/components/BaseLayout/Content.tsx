/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/member-delimiter-style */

import { AccountsCard } from '../Accounts/AccountsCard';
import { Dashboard } from '../Dashboard/Dashboard';
import { RolesCard } from '../RolesCard/RolesCard';



export const Content: React.FC<{ data: {Category: string,callback: () => void} }> = props => {
	switch (props.data.Category) {
		case 'roles':
			return <RolesCard />;
		case 'accounts':
			return <AccountsCard />;
		default:
			return <Dashboard callback={props.data.callback}/>;
	}
};
