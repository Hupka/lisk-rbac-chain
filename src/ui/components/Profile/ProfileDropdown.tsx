/* eslint-disable arrow-body-style */
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ProfileDropdownItems } from './ProfileDropdownItems';
import { ProfileIcon } from './ProfileIcon';

const userNavigationOnline = [
	{ name: 'Profile', href: '#' },
	{ name: 'Sign out', href: '#' },
];

const userNavigationOffline = [{ name: 'Sign in', href: '#' }];

export const ProfileDropdown: React.FC<{ signedIn: boolean }> = props => {
	return (
		<Menu as="div" className="ml-4 relative flex-shrink-0">
			{({ open }) => (
				<>
					<div>
						<ProfileIcon signedIn={props.signedIn} />
					</div>
					<Transition
						show={open}
						as={Fragment}
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items
							static
							className=" origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<ProfileDropdownItems
								selection={props.signedIn ? userNavigationOnline : userNavigationOffline}
							></ProfileDropdownItems>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};
