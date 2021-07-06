import { HeaderContent } from '../../models';

export const CardHeader: React.FC<{ headerContent: HeaderContent }> = props => (
	<div className="px-4 py-5 border-b border-gray-200 sm:px-6">
		<h3 className="text-lg leading-6 font-medium text-gray-900">{props.headerContent.title}</h3>
		{props.headerContent.subtitle ? (
			<p className="mt-1 text-sm text-gray-500">{props.headerContent.subtitle}</p>
		) : undefined}
	</div>
);
