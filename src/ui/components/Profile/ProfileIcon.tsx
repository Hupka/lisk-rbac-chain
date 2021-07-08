import { Menu } from '@headlessui/react';

/* eslint-disable arrow-body-style */
export const ProfileIcon: React.FC<{ signedIn: boolean }> = props => {
	return (
		<>
			{props.signedIn ? (
				<Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
					<span className="sr-only">Open user menu</span>
					<span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
						<svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
						<span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-400" />
					</span>
				</Menu.Button>
			) : (
				<Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
					<span className="sr-only">Open user menu</span>
					<span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
						<svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
						<span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-gray-300" />
					</span>
				</Menu.Button>
			)}
		</>
	);
};
