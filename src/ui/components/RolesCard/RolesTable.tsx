import { RowContent } from '../../models';
import { TableRow } from './TableRow';

export const RolesTable: React.FC<{
	rowContent: RowContent[];
	onOpenRoleCard: (text: string) => void;
}> = props => (
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
								Id
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Role Name
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Description
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Permissions
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Accounts
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Min Accounts
							</th>
							<th scope="col" className="relative px-6 py-3">
								<span className="sr-only">Edit</span>
							</th>
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
