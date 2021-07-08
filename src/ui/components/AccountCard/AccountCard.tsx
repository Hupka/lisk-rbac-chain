/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-console */

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { reducerAccountContent } from '../../logic';
import { AccountContent, HeaderContent } from '../../models';
import { PermissionsTable } from '../RoleCard/PermissionsTable';
import { Card } from '../UI/Card';
import { CardHeader } from '../UI/CardHeader';

export const AccountCard: React.FC<{ address: string }> = props => {
	// fetch
	const [content, setContent] = useState<AccountContent>();
	const [cookies] = useCookies();
	// const content: RowContent[] = [];
	useEffect(() => {
		async function fetchContent() {
			const fetchedContent = await reducerAccountContent(
				props.address,
				cookies['api-url'] ? cookies['api-url'] : 'http://localhost:4000',
			);
			setContent(fetchedContent);
		}
		fetchContent();
	}, []);

	return !content ? (
		<p></p>
	) : (
		<div className="flex flex-col items-center">
			<div className="max-w-3xl">
				<Card>
					<CardHeader
						headerContent={new HeaderContent('Account address'.concat(': ', content.address))}
					/>
					<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
						<dl className="sm:divide-y sm:divide-gray-200">
							<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Assigned Roles</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{content.roles.map(x => x.name).join(', ')}
								</dd>
							</div>
							<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Permissions</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									<PermissionsTable permissions={content.permissions} />
								</dd>
							</div>
						</dl>
					</div>
				</Card>
			</div>
		</div>
	);
};
