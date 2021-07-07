/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { HeaderContent, RowContent } from '../../models';
import { Card } from '../UI/Card';
import { CardHeader } from '../UI/CardHeader';
import { RolesTable } from './RolesTable';
import { reducerRolesList } from '../../logic/reducerRoles';
import { RoleCard } from '../RoleCard/RoleCard';
// import { callActions } from '../../logic';

export const RolesCard = () => {
	// fetch
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState<RowContent[]>([]);

	const [roleCardId,  setRoleCardId] = useState('0');
	const [displayRoleCard,  setDisplayRoleCard] = useState(false);

	const openRoleCard = (id: string) => {
		// eslint-disable-next-line no-console
		if(id !== roleCardId)
		{
			setRoleCardId(id)
			setDisplayRoleCard(true)
		}
	};


	useEffect(() => {
		async function fetchContent() {
			const fetchedContent = await reducerRolesList();
			setContent(fetchedContent);
			setLoading(false);
		}
		setDisplayRoleCard(false)
		fetchContent();
		
	}, []);

	return (
		!displayRoleCard ? <Card>
			<CardHeader headerContent={new HeaderContent('Roles',)} />
			{!loading ? (
				<RolesTable onOpenRoleCard={openRoleCard} rowContent={content} />
			) : (
				<div></div>
			)}
		</Card>:<RoleCard roleId={roleCardId} />
	);
};
