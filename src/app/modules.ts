/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { RbacModule } from 'lisk-rbac';

export const registerModules = (app: Application): void => {
  app.registerModule(RbacModule);
};
