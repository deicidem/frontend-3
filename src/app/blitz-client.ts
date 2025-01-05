'use client';
import { AuthClientPlugin } from '@blitzjs/auth';
import { setupBlitzClient } from '@blitzjs/next';
import { BlitzRpcPlugin } from '@blitzjs/rpc';

export const { withBlitz, BlitzProvider } = setupBlitzClient({
	plugins: [
		AuthClientPlugin({
			cookiePrefix: 'event_management_next',
		}),
		BlitzRpcPlugin({}),
	],
});
