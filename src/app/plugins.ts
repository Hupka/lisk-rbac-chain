/* eslint-disable @typescript-eslint/no-empty-function */
import { DashboardPlugin } from '@liskhq/lisk-framework-dashboard-plugin';
import { RBACAPIPlugin } from 'lisk-rbac';
import { Application } from 'lisk-sdk';

export const registerPlugins = (app: Application): void => {
  app.registerPlugin(DashboardPlugin);
  app.registerPlugin(RBACAPIPlugin);
};
