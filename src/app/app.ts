/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Application, PartialApplicationConfig, utils } from 'lisk-sdk';
import { registerModules } from './modules';
import { registerPlugins } from './plugins';

export const getApplication = (
	genesisBlock: Record<string, unknown>,
	config: PartialApplicationConfig,
): Application => {

	// PATCH genesis block for RBAC module
	const updatedGenesisBlock = utils.objects.mergeDeep({}, genesisBlock);

	updatedGenesisBlock.header.asset.accounts = updatedGenesisBlock.header.asset.accounts.map(a =>
		utils.objects.mergeDeep({}, a, {
			rbac: {
				roles: [],
			}
		}),
	);

	// Modify genesisConfig to include the genesis rbac admin accounts  as a custom parameter
	const appConfig = utils.objects.mergeDeep({}, config, {
		rpc: {
			mode: 'ws',
			enable: true
		},
		genesisConfig: {
			rbacConfig: {
				genesisAccounts: [{
					roles: ["1"],
					addresses: ["024bd49e98ef623ea0f57a172353cf7a58087a55"],
				},
				{
					roles: ["2"],
					addresses: ["0480c5eba43bb3a9b76cd20f9e3c99697fbe67d5"],
				},
				{
					roles: ["3"],
					addresses: ["086baf263127a7fdf23439aa55265611105eed2d"],
				}]
			}
		},
		plugins: {
			rbacHttpApi: {
				port: 4000,
				whiteList: ['127.0.0.1'],
				cors: {
					origin: '*',
					methods: ['GET', 'POST', 'PUT'],
				},
				limits: {
					max: 0,
					delayMs: 0,
					delayAfter: 0,
					windowMs: 60000,
					headersTimeout: 5000,
					serverSetTimeout: 20000,
				},
			},
		}
	});

	const app = Application.defaultApplication(updatedGenesisBlock, appConfig);

	registerModules(app);
	registerPlugins(app);

	return app;
};
