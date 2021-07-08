/* This example requires Tailwind CSS v2.0+ */

import { useState } from 'react';
import { AssetsDropdown } from './assetsDropdown';

export default function ConfigurePolicies() {
	const [example, setExample] = useState('');

	const setAssetExample = (assetExample: string) => {
		setExample(assetExample);
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
					<div className="w-full pb-6 px-6">
						<div
							contentEditable="true"
							id="about"
							className="p-1 w-full shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
						>
							<pre className="overflow">{example}</pre>
						</div>
					</div>
					<div className=" pb-6">
						<button
							type="button"
							className={
								' mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
							}
						>
							Submit Transaction
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
