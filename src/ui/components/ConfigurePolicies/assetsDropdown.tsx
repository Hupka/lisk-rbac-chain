/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-shadow */
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon, CheckIcon } from '@heroicons/react/outline';
import { useState, Fragment, useEffect } from 'react';

const assets = [
	{
		name: 'Assign Role',
		transactionString: 'role_membership:assign',
		example: { address: '<hex address>', roles: ['<role id>'] },
	},
	{
		name: 'Remove Role',
		transactionString: 'role_membership:remove',
		example: { address: '<hex address>', roles: ['<role id>'] },
	},
	{
		name: 'Create Role',
		transactionString: 'roles:create',
		example: { name: '<role name>', description: '<description text>', inheritance: ['<role id>'] },
	},
	{
		name: 'Update Role',
		transactionString: 'roles:update',
		example: {
			id: '<role id>',
			name: '<role name>',
			description: '<description text>',
			inheritance: ['<role id>'],
		},
	},
	{
		name: 'Delete Role',
		transactionString: 'roles:delete',
		example: { id: '<role id>' },
	},
	{
		name: 'Add Policy',
		transactionString: 'permissions:associate',
		example: { addresses: ['<hex address>'], roles: ['<role id>'] },
	},
	{
		name: 'Remove Policy',
		transactionString: 'permissions:remove',
		example: { addresses: ['<hex address>'], roles: ['<role id>'] },
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export const AssetsDropdown: React.FC<{ setExample: (example: string) => void }> = props => {
	const [selected, setSelected] = useState(assets[0]);

	const onChangeHandler = event => {
		setSelected(event);
		const example = assets.find(x => x.name === event.name);
		if (example) {
			props.setExample(JSON.stringify(example.example, null, 2));
		}
	};

	useEffect(() => {
		props.setExample(JSON.stringify(assets[0].example, null, 2));
	}, []);

	return (
		<Listbox value={selected} onChange={onChangeHandler}>
			{({ open }) => (
				<>
					<div className="mt-1 relative">
						<Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
							<span className="w-full inline-flex truncate">
								<span className="truncate">{selected.name}</span>
								<span className="ml-2 truncate text-gray-500">{selected.transactionString}</span>
							</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options
								static
								className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
							>
								{assets.map(asset => (
									<Listbox.Option
										key={asset.transactionString}
										className={({ active }) =>
											classNames(
												active ? 'text-white bg-indigo-600' : 'text-gray-900',
												'cursor-default select-none relative py-2 pl-3 pr-9',
											)
										}
										value={asset}
									>
										{({ selected, active }) => (
											<>
												<div className="flex">
													<span
														className={classNames(
															selected ? 'font-semibold' : 'font-normal',
															'truncate',
														)}
													>
														{asset.name}
													</span>
												</div>

												{selected ? (
													<span
														className={classNames(
															active ? 'text-white' : 'text-indigo-600',
															'absolute inset-y-0 right-0 flex items-center pr-4',
														)}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};
