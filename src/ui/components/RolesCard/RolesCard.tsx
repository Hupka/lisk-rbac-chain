/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import { HeaderContent, RowContent } from '../../models';
import { Card } from '../UI/Card';
import { CardHeader } from '../UI/CardHeader';
import { RolesTable } from './RolesTable';
import { reducerRolesList } from '../../logic/reducerRoles';

// import { callActions } from '../../logic';

export const RolesCard: React.FC<{ onOpenRoleCard: (text: string) => void }> = props => {
	// fetch
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState<RowContent[]>([]);
	// const content: RowContent[] = [];
	useEffect(() => {
		async function fetchContent() {
			const fetchedContent = await reducerRolesList();
			setContent(fetchedContent);
			setLoading(false);
		}
		fetchContent();
	}, []);

	return (
		<Card>
			<CardHeader headerContent={new HeaderContent('Roles')} />
			{!loading ? (
				<RolesTable onOpenRoleCard={props.onOpenRoleCard} rowContent={content} />
			) : (
				<div></div>
			)}
		</Card>
	);
};
