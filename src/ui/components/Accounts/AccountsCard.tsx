/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { reducerAccountsList } from '../../logic/reducerRoles';
import { AccountRolesContent, HeaderContent } from '../../models';
import { AccountCard } from '../AccountCard/AccountCard';
import { Card } from '../UI/Card';
import { CardHeader } from '../UI/CardHeader';
import { AccountsTable } from './AccountsTable';

export const AccountsCard = () => {
	// fetch
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState<AccountRolesContent>({} as AccountRolesContent);
	const [cookies] = useCookies()

	const [roleCardId, setRoleCardId] = useState('0');
	const [displayRoleCard, setDisplayRoleCard] = useState(false);

	const openRoleCard = (id: string) => {
		// eslint-disable-next-line no-console
		if (id !== roleCardId) {
			setRoleCardId(id);
			setDisplayRoleCard(true);
		}
	};

	useEffect(() => {
		async function fetchContent() {
			const fetchedContent = await reducerAccountsList(cookies['api-url'] ? cookies['api-url'] : 'http://localhost:4000' );
			setContent(fetchedContent);
			setLoading(false);
		}
		setDisplayRoleCard(false);
		fetchContent();
	}, []);

	return !displayRoleCard ? (
		<Card>
			<CardHeader headerContent={new HeaderContent('Accounts')} />
			{!loading ? (
				<AccountsTable onOpenRoleCard={openRoleCard} rowContent={content} />
			) : (
				<div></div>
			)}
		</Card>
	) : (
		<AccountCard address={roleCardId} />
	);
};
