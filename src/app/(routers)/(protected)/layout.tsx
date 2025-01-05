'use client';

import '@/app/styles/globals.scss';
import '@/app/layoutStyled.scss';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useSession } from '@blitzjs/auth';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const session = useSession();

	useEffect(() => {
		if (!session.userId) {
			router.push('/login');
		}
	}, [session, router]);

	if (!session.userId) {
		return null;
	}

	return <>{children}</>;
}
