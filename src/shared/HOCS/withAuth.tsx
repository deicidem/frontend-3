'use client';

import { useSession } from '@blitzjs/auth';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect } from 'react';

export function withAuth<T extends object>(
	WrappedComponent: ComponentType<T>,
	allowedRoles: string[]
) {
	const WithAuthComponent = (props: T) => {
		const session = useSession();
		const router = useRouter();

		useEffect(() => {
			if (!session.userId) {
				router.push('/login');
				return;
			}

			if (session.role && !allowedRoles.includes(session.role)) {
				router.push('/');
			}
		}, [session, router]);

		if (
			!session.userId ||
			(session.role && !allowedRoles.includes(session.role))
		) {
			return null;
		}

		return <WrappedComponent {...props} />;
	};

	WithAuthComponent.displayName = `withAuth(${
		WrappedComponent.displayName || WrappedComponent.name || 'Component'
	})`;

	return WithAuthComponent;
}
