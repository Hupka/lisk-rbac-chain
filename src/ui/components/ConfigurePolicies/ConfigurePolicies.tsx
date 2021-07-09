/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { fetchNodeInfo, sendTransactions } from '../../../app/plugins/lisk_rbac_ui/api';
import { generateTransaction, SendTransactionOptions } from '../../logic/transaction_utils';
import {
	assignRoleMembershipAssetPropsSchema,
	associatePermissionsAssetPropsSchema,
	createRoleAssetPropsSchema,
	deleteRoleAssetPropsSchema,
	removePermissionsAssetPropsSchema,
	removeRoleMembershipAssetPropsSchema,
	updateRoleAssetPropsSchema,
} from '../../models/assets';
import { AssetsDropdown } from './AssetsDropdown';

const VALID_JSON = 'Input is valid JSON.';
const INVALID_JSON = 'Input is no valid JSON.';

export default function ConfigurePolicies() {
	const [example, setExample] = useState('');
	const [selectedTx, setSelectedTx] = useState('');
	const [cookies] = useCookies();
	const [asset, setAsset] = useState<Record<string, unknown>>({});
	const [validationText, setValidationText] = useState(VALID_JSON);

	const setAssetExample = (assetName: string, assetExample: string) => {
		setExample(assetExample);
		setSelectedTx(assetName);
	};

	const inputValidator = event => {
		event.preventDefault();

		// Parse text input into object
		try {
			setAsset(JSON.parse(event.target.outerText));
			setValidationText(VALID_JSON);
		} catch (error) {
			setValidationText(INVALID_JSON);
		}
	};

	const submitInputAsTransaction = async (event): Promise<unknown> => {
		event.preventDefault();

		// Fetch Node Info to get network identifier
		const nodeInfo = await fetchNodeInfo(
			cookies['api-url'] ? cookies['api-url'] : 'http://localhost:4000',
		);

		// select correct schema
		let schema: unknown = {};
		let assetId = 0;

		switch (selectedTx) {
			case 'role_membership:assign':
				schema = assignRoleMembershipAssetPropsSchema;
				assetId = 6;
				break;
			case 'role_membership:remove':
				schema = removeRoleMembershipAssetPropsSchema;
				assetId = 7;
				break;
			case 'roles:create':
				schema = createRoleAssetPropsSchema;
				assetId = 1;
				break;
			case 'roles:update':
				schema = updateRoleAssetPropsSchema;
				assetId = 2;
				break;
			case 'roles:delete':
				schema = deleteRoleAssetPropsSchema;
				assetId = 3;
				break;
			case 'permissions:associate':
				schema = associatePermissionsAssetPropsSchema;
				assetId = 4;
				break;
			case 'permissions:remove':
				schema = removePermissionsAssetPropsSchema;
				assetId = 5;
				break;
			default:
				schema = createRoleAssetPropsSchema;
				assetId = 1;
				break;
		}

		const txData: SendTransactionOptions = {
			moduleID: 7222,
			assetID: assetId,
			asset,
			schema,
			passphrase: cookies.passphrase ? cookies.passphrase : '',
			fee: '0',
			networkIdentifier: nodeInfo.networkIdentifier,
			minFeePerByte: nodeInfo.genesisConfig.minFeePerByte,
		};

		const tx = await generateTransaction(
			txData,
			cookies['api-url'] ? cookies['api-url'] : 'http://localhost:4000',
		);

		return sendTransactions(tx, cookies['api-url'] ? cookies['api-url'] : 'http://localhost:4000');
	};

	return (
		<div className="flex flex-col items-center">
			<div className="bg-white shadow sm:rounded-lg max-w-3xl">
				<div className="px-4 py-5 sm:p-6">
					<div className="sm:flex sm:items-start sm:justify-between">
						<div>
							<h3 className="text-lg leading-6 font-medium text-gray-900">Configure Policies</h3>
							<div className="mt-2 max-w-xl text-sm text-gray-500">
								<p>
									The configuration of the application's{' '}
									<span className=" italic ">role-based access controls</span> happens by submitting
									transactions to the blockchain.
								</p>
							</div>
						</div>
						<div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
							<AssetsDropdown setExample={setAssetExample} />
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-full pb-2 px-6">
						<div
							onInput={inputValidator}
							contentEditable="true"
							id="about"
							className="p-1 w-full shadow-sm block focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
						>
							<pre className="overflow">{example}</pre>
						</div>
						{validationText === 'Input is valid JSON.' ? (
							<div className="mt-1 pl-1 text-xs text-green-400">{validationText}</div>
						) : (
							<div className="mt-1 pl-1 text-xs text-red-400">{validationText}</div>
						)}
					</div>
					<div className=" pb-6">
						<button
							type="button"
							className={
								' mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
							}
							onClick={submitInputAsTransaction}
						>
							Submit Transaction
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
