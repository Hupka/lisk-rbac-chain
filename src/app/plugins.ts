/* eslint-disable @typescript-eslint/no-empty-function */
import { DashboardPlugin } from '@liskhq/lisk-framework-dashboard-plugin';
import { Application } from 'lisk-sdk';
import { LiskRbacUIPlugin } from "./plugins/lisk_rbac_ui/lisk_rbac_ui_plugin"

export const registerPlugins = (app: Application): void => {
  app.registerPlugin(DashboardPlugin);
  app.registerPlugin(LiskRbacUIPlugin);
};
