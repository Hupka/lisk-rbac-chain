import { AccountRolesContent } from '../../models';
/* eslint-disable no-console */
export const TableRow: React.FC<{
	rowContent: AccountRolesContent;
	onOpenRoleCard: (text: string) => void;
}> = props => (
	<>
		{props.rowContent.accountRows.map(row => (
			<tr key={row.address}>
				<td
					onClick={() => {
						props.onOpenRoleCard(row.address);
					}}
					className="font-mono px-6 py-4 whitespace-nowrap text-sm text-gray-500 underline"
				>
					{row.address}
				</td>
				{row.roleAssignmentsArray.map(item => (
					<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 underline">
						<div className="flex flex-col items-center h-5">
							{item ? (
								<input
									checked
									disabled
									id="comments"
									name="comments"
									type="checkbox"
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
								/>
							) : (
								<input
									disabled
									id="comments"
									name="comments"
									type="checkbox"
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
								/>
							)}
						</div>
					</td>
				))}
			</tr>
		))}
	</>
);
