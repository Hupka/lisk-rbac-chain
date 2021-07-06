import { AccountCard } from './ui/components/AccountCard/AccountCard';
import Sidebar from './ui/components/BaseLayout/Sidebar';
import { RoleCard } from './ui/components/RoleCard/RoleCard';
import './ui/styles/output.css';

function App() {
	return (
		<div className="bg-gray-200">
			<div>
				<Sidebar />
			</div>
			<div className="px-7 py-7 ">
				<RoleCard />
			</div>
			<div className="px-7 py-7 ">
				<AccountCard />
			</div>
		</div>
	);
}

export default App;
