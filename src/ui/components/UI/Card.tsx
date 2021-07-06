/* This example requires Tailwind CSS v2.0+ */
export const Card: React.FC = props => (
	<div className="bg-white shadow overflow-hidden sm:rounded-lg">{props.children}</div>
);
