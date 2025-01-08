import { AuthPluginClientOptions } from '@blitzjs/auth';

export const authConfig: AuthPluginClientOptions = {
	cookiePrefix: 'cms_app',
};
export type Role = 'ADMIN' | 'CLIENT';
