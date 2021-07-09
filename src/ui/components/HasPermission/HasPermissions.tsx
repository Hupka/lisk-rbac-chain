/* eslint-disable  */

import { useState } from 'react';
import { hasPermission } from '../../../app/plugins/lisk_rbac_ui/api';
import { ModalHasPermissionResult } from '../Modals/ModalHasPermissionResult';
import { useCookies } from 'react-cookie';

export const HasPermissions = () => {
	const [showModal, setShowModal] = useState(false);
	const [hasPermissionsModal, setHasPermissionsModal] = useState(false);
	const [address, setAddress] = useState('086baf263127a7fdf23439aa55265611105eed2d');
	const [resource, setResource] = useState('role_membership');
	const [operation, setOperation] = useState('assign');
	const [cookies] = useCookies();

	function closeModal() {
		setShowModal(false);
	}

	function handleAddressFieldChange(event) {
		event.preventDefault();
		setAddress(event.target.value);
	}

	function handleOperationFieldChange(event) {
		event.preventDefault();
		setOperation(event.target.value);
	}

	function handleResourceFieldChange(event) {
		event.preventDefault();
		setResource(event.target.value);
	}

	const hasPermissionsHandler = async () => {
		const result = await hasPermission(
			address,
			resource,
			operation,
			cookies['api-url'] ? cookies['api-url'] : 'http://localhost:4000',
		);

		if (typeof result === 'boolean') {
			setHasPermissionsModal(result);
		} else {
			setHasPermissionsModal(false);
		}

		setShowModal(true);
	};

	return (
		<>
			<div className="max-w-3xl flex flex-col items-center mx-auto py-8 px-4 overflow-hidden">
				<div className="flex flex-col items-center max-w-md">
					<p className="text-2xl font-bold pb-5">Validate Account Permissions</p>
					<p className="text-sm">
						The module exposes an Action API{' '}
						<span className="font-mono text-indigo-500">rbac:hasPermission</span> to check if an
						account can perform a certain operation on a given resource.
					</p>
					<p className="text-sm pt-4">
						Enter <span className="font-mono text-indigo-500">address</span> as a HEX string. The
						fields <span className="font-mono text-indigo-500">resource</span> and{' '}
						<span className="font-mono text-indigo-500">operation</span> can take any string and the
						solver will validate if any of the account's roles has been granted these permissions.
					</p>
				</div>
				<form className="flex flex-col mt-4 sm:flex sm:items-center w-96">
					<div className="w-full sm:max-w-xs pt-2">
						<input
							type="text"
							name="address"
							id="address"
							className="py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-solid border-gray-300 rounded-md"
							placeholder="Address as HEX string"
							onChange={e => handleAddressFieldChange(e)}
							value={address}
						/>
					</div>
					<div className="w-full sm:max-w-xs pt-2">
						<input
							type="text"
							name="resource"
							id="resource"
							className="py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-solid border-gray-300 rounded-md"
							placeholder="Resource"
							onChange={e => handleResourceFieldChange(e)}
							value={resource}
						/>
					</div>
					<div className="w-full sm:max-w-xs pt-2">
						<input
							type="text"
							name="operation"
							id="operation"
							className="py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-solid border-gray-300 rounded-md"
							placeholder="Operation"
							onChange={e => handleOperationFieldChange(e)}
							value={operation}
						/>
					</div>

					<div
						aria-live="assertive"
						className="fixed mt-24 inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
					>
						<div className="w-full flex flex-col items-center space-y-4 sm:items-end"></div>
					</div>
				</form>
				<div className="pt-4">
					<button
						type="button"
						onClick={hasPermissionsHandler}
						className={
							' mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
						}
					>
						Check Permission
					</button>
				</div>
			</div>
			{!showModal ? (
				<p></p>
			) : (
				<ModalHasPermissionResult
					address={address}
					resource={resource}
					operation={operation}
					result={
						hasPermissionsModal
							? 'Account is granted permission'
							: 'Account does not have permission'
					}
					type={hasPermissionsModal ? 'success' : 'fail'}
					closeModal={closeModal}
				/>
			)}
		</>
	);
};
