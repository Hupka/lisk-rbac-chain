import { useState } from 'react';
/* eslint-disable  */

export const Dashboard = () => {
	const [setupState, setSetupState] = useState(false);
	const [tryConnect, setTryConnect] = useState(false);
	return !setupState ? (
		<div className="max-w-3xl flex flex-col items-center mx-auto py-8 px-4 overflow-hidden">
			<img
				className="h-16 w-auto"
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				src={`${process.env.PUBLIC_URL}assets/icon.svg`}
				alt="Workflow"
			/>
			<p className="text-2xl font-bold pb-5 pt-4">Welcome in the Lisk RBAC Console!</p>
			<p className="text-sm">Start by providing the URL to the Lisk RBAC module’s HTTP API.</p>
			<form className="mt-5 pt-2 sm:flex sm:items-center w-96">
				<div className="w-full sm:max-w-xs">
					<input
						type="text"
						name="connected"
						id="connected"
						className="py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-solid border-gray-300 rounded-md"
						placeholder="http://localhost:4000"
					/>
				</div>
				<button
					type="submit"
					// TODO: missing valitation here
					onClick={() => {
						setTryConnect(true);
						// try to call
						const restult: Boolean = false;
						if (restult) {
							setSetupState(true);
						} else {
						}
					}}
					// maybe not the best way to do it, but shortens code
					className={
						(tryConnect ? 'animate-pulse ' : '') +
						' mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
					}
				>
					Connect
				</button>
			</form>
		</div>
	) : (
		<p className="text-yellow-700 text-center">
			Display information about the current state of the Blockchain. For example Block-Height
		</p>
	);
};
