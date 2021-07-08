/* eslint-disable no-nested-ternary */
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, BanIcon, VariableIcon } from '@heroicons/react/outline';

export const ModalHasPermissionResult: React.FC<{
	result: string;
	type: string;
	operation: string;
	resource: string;
	address: string;
	closeModal: () => void;
}> = props => {
	const [open, setOpen] = useState(true);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				static
				className="fixed z-30 inset-0 overflow-y-auto"
				open={open}
				onClose={() => {
					setOpen(false);
					props.closeModal();
				}}
			>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
							<div>
								{props.type === 'success' ? (
									<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
										<CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
									</div>
								) : props.type === 'fail' ? (
									<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
										<BanIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
									</div>
								) : (
									<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
										<VariableIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
									</div>
								)}
								<div className="mt-3 text-center sm:mt-5">
									<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
										{props.result}
									</Dialog.Title>
								</div>
							</div>
							<div className="flex flex-col py-2 mt-3 bg-gray-100 items-center">
								<p className="font-mono">{[props.resource, props.operation].join(':')}</p>
							</div>
							<div className="mt-4 sm:mt-4">
								<button
									type="button"
									className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
									onClick={() => {
										setOpen(false);
										props.closeModal();
									}}
								>
									Close
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
