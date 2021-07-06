import { RoleAccounts } from '../../models';

export const AddressesTable: React.FC<{ accounts: RoleAccounts }> = props => (
	<>
		{props.accounts.addresses.map(address => (
			<tr className="flex justify-between" key={Buffer.from(address).toString('hex')}>
				<td className="pb-2 whitespace-nowrap text-sm font-medium text-gray-900">
					{Buffer.from(address).toString('hex')}
				</td>
				<td className="px-6 pb-2 whitespace-nowrap text-right text-sm font-medium">
					<a href="#" className="text-indigo-600 hover:text-indigo-900">
						Open
					</a>
				</td>
			</tr>
		))}
	</>
);
