import { ComponentType } from 'react';
import { withAuth } from '@/shared/HOCS/withAuth';

export const withAdminAuthHOC = <T extends object>(
	Component: ComponentType<T>
) => withAuth(Component, ['ADMIN']);
