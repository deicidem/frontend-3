import { AuthPluginClientOptions } from '@blitzjs/auth';

export const authConfig: AuthPluginClientOptions = {
	cookiePrefix: 'event_management_next',
};
export type Role = 'ADMIN' | 'CLIENT';
