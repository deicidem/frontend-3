import { setupBlitzServer } from '@blitzjs/next';
import {
	AuthServerPlugin,
	PrismaStorage,
	simpleRolesIsAuthorized,
} from '@blitzjs/auth';
import { BlitzLogger } from 'blitz';
import { RpcServerPlugin } from '@blitzjs/rpc';
import db from '../../db';

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
			cookiePrefix: 'event_management_next',
			storage: PrismaStorage(db),
			isAuthorized: simpleRolesIsAuthorized,
		}),
		RpcServerPlugin({}),
	],
	logger: BlitzLogger({}),
});
