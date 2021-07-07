/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { reducerRole } from '../../logic';
import { HeaderContent, RoleContent } from '../../models';
import { Card } from '../UI/Card';
import { CardHeader } from '../UI/CardHeader';
import { AddressesTable } from './AddressesTable';
import { PermissionsTable } from './PermissionsTable';

export const RoleCard: React.FC<{ roleId: string }> = props => {
	// fetch
	const [content, setContent] = useState<RoleContent>();
	// const content: RowContent[] = [];
	useEffect(() => {
		async function fetchContent() {
			const fetchedContent = await reducerRole(props.roleId);
			setContent(fetchedContent);
		}
		fetchContent();
	}, []);

	return !content ? (
		<p></p>
	) : (
		<Card>
			<CardHeader
				headerContent={
					new HeaderContent(
						'Role'.concat(': ', content.roleRecord.name),
						content.roleRecord.description,
					)
				}
			/>

			<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
				<dl className="sm:divide-y sm:divide-gray-200">
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Role Id</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{content.roleRecord.id}
						</dd>
					</div>
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Lifecycle Status</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{content.roleRecord.lifecycle}
						</dd>
					</div>
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Ancestry Roles</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{content.ancestryRoles.map(x => x.name).join(', ')}
						</dd>
					</div>
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Direct Permissions</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							<PermissionsTable permissions={content.directPermissions} />
						</dd>
					</div>
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Inherited Permissions</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							<PermissionsTable permissions={content.inheritedPermissions} />
						</dd>
					</div>
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Accounts</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							<AddressesTable accounts={content.roleAccounts} />
						</dd>
					</div>
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Minium Number of Accounts</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{content.roleRecord.minAccounts}
						</dd>
					</div>
				</dl>
			</div>
		</Card>
	);
};
