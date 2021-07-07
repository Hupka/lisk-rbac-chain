/* eslint-disable no-nested-ternary */
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
import { Dialog, Transition } from '@headlessui/react';
import {
	AcademicCapIcon,
	BellIcon,
	HomeIcon,
	MenuAlt2Icon,
	UsersIcon,
	XIcon,
} from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { Content } from './Content';

const navigation = [
	{ name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
	{ name: 'Roles', href: '#', icon: AcademicCapIcon, current: false },
	{ name: 'Accounts', href: '#', icon: UsersIcon, current: false },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Home() {
	const [homeOpen, setHomeOpen] = useState(false);
	const [homeCategory, setHomeCategory] = useState('dashboard');

	const openDashboardPanel = () => {
		setHomeCategory('dashboard');

		for (const item of navigation) {
			if (item.name === 'Dashboard') {
				item.current = true;
			} else {
				item.current = false;
			}
		}
	};
	const openRolesPanel = () => {
		setHomeCategory('roles');
		for (const item of navigation) {
			if (item.name === 'Roles') {
				item.current = true;
			} else {
				item.current = false;
			}
		}
	};
	const openAccountsPanel = () => {
		setHomeCategory('accounts');
		for (const item of navigation) {
			if (item.name === 'Accounts') {
				item.current = true;
			} else {
				item.current = false;
			}
		}
	};

	return (
		<div className="h-screen flex overflow-hidden bg-gray-200">
			<Transition.Root show={homeOpen} as={Fragment}>
				<Dialog
					as="div"
					static
					className="fixed inset-0 flex z-40 md:hidden"
					open={homeOpen}
					onClose={setHomeOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="absolute top-0 right-0 -mr-12 pt-2">
									<button
										className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										onClick={() => setHomeOpen(false)}
									>
										<span className="sr-only">Close sidebar</span>
										<XIcon className="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
							</Transition.Child>
							<div className="flex-shrink-0 flex items-center px-4">
								<img
									className="h-8 w-auto"
									// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
									src={`${process.env.PUBLIC_URL}Logo.svg`}
									alt="Workflow"
								/>
							</div>
							<div className="mt-5 flex-1 h-0 overflow-y-auto">
								<nav className="px-2 space-y-1">
									{navigation.map(item => (
										<a
											onClick={
												item.name === 'dashboard'
													? openDashboardPanel
													: item.name === 'accounts'
													? openAccountsPanel
													: openRolesPanel
											}
											key={item.name}
											href={item.href}
											className={classNames(
												item.current
													? 'bg-gray-900 text-white'
													: 'text-gray-300 hover:bg-gray-700 hover:text-white',
												'group flex items-center px-2 py-2 text-base font-medium rounded-md',
											)}
										>
											<item.icon
												className={classNames(
													item.current
														? 'text-gray-300'
														: 'text-gray-400 group-hover:text-gray-300',
													'mr-4 flex-shrink-0 h-6 w-6',
												)}
												aria-hidden="true"
											/>
											{item.name}
										</a>
									))}
								</nav>
							</div>
						</div>
					</Transition.Child>
					<div className="flex-shrink-0 w-14" aria-hidden="true">
						{/* Dummy element to force sidebar to shrink to fit close icon */}
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden md:flex md:flex-shrink-0">
				<div className="flex flex-col w-64">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex flex-col h-0 flex-1">
						<div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
							<img
								className="h-8 w-auto"
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								src={`${process.env.PUBLIC_URL}Logo.svg`}
								alt="Workflow"
							/>
						</div>
						<div className="flex-1 flex flex-col overflow-y-auto">
							<nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
								{navigation.map(item => (
									<a
										onClick={
											item.name === 'Dashboard'
												? openDashboardPanel
												: item.name === 'Accounts'
												? openAccountsPanel
												: openRolesPanel
										}
										key={item.name}
										href={item.href}
										className={classNames(
											item.current
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
										)}
									>
										<item.icon
											className={classNames(
												item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
												'mr-3 flex-shrink-0 h-6 w-6',
											)}
											aria-hidden="true"
										/>
										{item.name}
									</a>
								))}
							</nav>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-0 flex-1 overflow-hidden">
				<div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
					<button
						className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
						onClick={() => setHomeOpen(true)}
					>
						<span className="sr-only">Open sidebar</span>
						<MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
					</button>
					<div className="flex-1 px-4 flex justify-between">
						<div className="flex-1 flex"></div>
						<div className="ml-4 flex items-center md:ml-6">
							<button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								<span className="sr-only">View notifications</span>
								<BellIcon className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>

				<main className="flex-1 relative overflow-y-auto focus:outline-none">
					<div className="py-6">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
							{/* Replace with your content */}
							<Content category={homeCategory} />
							{/* /End replace */}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
