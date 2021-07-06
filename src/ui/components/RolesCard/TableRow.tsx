import { RowContent } from '../../models';

export const TableRow: React.FC<{
	rowContent: RowContent[];
	onOpenRoleCard: (text: string) => void;
}> = props => (
	<>
		{props.rowContent.map(role => (
			<tr key={role.roleId}>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 underline">
					{role.roleId}
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
					{role.roleName}
				</td>
				<td className="px-6 py-4 text-sm text-gray-500">{role.description}</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
					{role.permissionCount}
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.accountCount}</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.minAccounts}</td>
				<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
					<a
						onClick={() => props.onOpenRoleCard(role.roleId)}
						href="#"
						className="text-indigo-600 hover:text-indigo-900"
					>
						Open
					</a>
				</td>
			</tr>
		))}
	</>
);
