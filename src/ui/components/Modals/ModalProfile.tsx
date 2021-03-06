import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useCookies } from 'react-cookie';

/* eslint-disable  */

export const ModalProfile: React.FC<{ closeModal: () => void }> = props => {
	const [open, setOpen] = useState(true);
	const [cookies, setCookie] = useCookies();
	const [passphrase, setPassphrase] = useState(cookies['passphrase'] ? cookies['passphrase']:'')
	function handlePassphraseFieldChange(event) {
		// set all loading states an alerts to false
		
		event.preventDefault();
		setPassphrase(event.target.value);
	}
	
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
								<div className="mt-3 text-center sm:mt-5">
									<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
										Enter Passphrase
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											When logged in the passphrase is stored in the browser only and used to sign
											transactions.
										</p>
										<form className="space-y-8 divide-y divide-gray-200 mt-4 text-sm text-gray-500">
											<div className="mt-1 sm:mt-0 sm:col-span-2">
												<textarea
													id="about"
													name="about"
													rows={3}
													value={passphrase}
													onChange={e => handlePassphraseFieldChange(e)}
													className="p-1 max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
												/>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-6">
								<button
									type="button"
									className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
									onClick={() => {

										setCookie('passphrase',passphrase)
										setOpen(false);

									
										props.closeModal();
									}}
								>
									Save
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
