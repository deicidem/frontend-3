import { ComponentType } from 'react';
import { withAuth } from '@/shared/HOCS/withAuth';

export function withClientAuthHOC<T extends object>(
	Component: ComponentType<T>
) {
	return withAuth(Component, ['CLIENT']);
}
