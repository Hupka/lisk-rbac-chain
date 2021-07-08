/* eslint-disable arrow-body-style */
/* eslint-disbale @typescript-eslint/no-unsafe-call */
import { Menu } from '@headlessui/react';


function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export const ProfileDropdownItems: React.FC<{
	selection: {
		name: string;
		href: string;
	}[];
	clickedEl: (el: { name: string; href: string }) => void;
}> = props => {
	return (
		<>
			{props.selection.map(item => (
				<Menu.Item key={item.name}>
					{({ active }) => (
						<a
							href={item.href}
							className={classNames(
								active ? 'bg-gray-100' : '',
								'block px-4 py-2 text-sm text-gray-700 text-left',
							)}
							onClick={() => {
								props.clickedEl(item)
							}}
						>
							{item.name}

						</a>
					)}

				</Menu.Item>
			))}





		</>




	);
};
