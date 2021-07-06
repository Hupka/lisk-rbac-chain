import { RBACPermissionRecord } from '../../models';

export const PermissionsTable: React.FC<{ permissions: RBACPermissionRecord[] }> = props => (
	<>
		{props.permissions.map(permission => (
			<tr key={permission.id}>
				<td className="pb-2 whitespace-nowrap text-sm font-medium text-gray-900">
					{[permission.resource, permission.operation].join(':')}
				</td>
				<td className="px-4 pb-2 text-sm text-gray-500">{permission.description}</td>
			</tr>
		))}
	</>
);
