/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AccountRolesContent } from '../../models';
import { TableRow } from './TableRow';

export const AccountsTable: React.FC<{
	rowContent: AccountRolesContent;
	onOpenRoleCard: (text: string) => void;
}> = props => {
	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Address
								</th>
								{props.rowContent.roles.map(item => (
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										<span className="flex flex-col items-center ">{item.name}</span>
									</th>
								))}
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							<TableRow
								onOpenRoleCard={props.onOpenRoleCard}
								rowContent={props.rowContent}
							></TableRow>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
