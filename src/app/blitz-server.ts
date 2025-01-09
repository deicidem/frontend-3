import { setupBlitzServer } from '@blitzjs/next';
import {
	AuthServerPlugin,
	PrismaStorage,
	simpleRolesIsAuthorized,
} from '@blitzjs/auth';
import { BlitzLogger } from 'blitz';
import { RpcServerPlugin } from '@blitzjs/rpc';
import db from '../../db';
import { authConfig } from './blitz-auth-config';

export const {
	api,
	useAuthenticatedBlitzContext,
	invoke,
	getBlitzContext,
	withBlitzAuth,
	gSP,
	gSSP,
} = setupBlitzServer({
	plugins: [
		AuthServerPlugin({
			...authConfig,
			storage: PrismaStorage(db),
			isAuthorized: simpleRolesIsAuthorized,
		}),
		RpcServerPlugin({}),
	],
	logger: BlitzLogger({}),
});
