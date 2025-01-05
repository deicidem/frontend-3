'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { loadingSlice } from '@/app/store/slices/loading/loadingSlice';
import { usePathname } from 'next/navigation';
import { Container } from '@mui/material';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export function AppLayout({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const [content, setContent] = useState<ReactNode>(children);

	useEffect(() => {
		dispatch(loadingSlice.actions.setLoading(true));

		const timeout = setTimeout(() => {
			setContent(children);
			dispatch(loadingSlice.actions.setLoading(false));
		}, 500);

		return () => clearTimeout(timeout);
	}, [pathname, dispatch]);

	return (
		<>
			<div className='root'>
				<Header />
				<div className='wrapper-page'>
					<Container>{content}</Container>
				</div>
				<Footer />
			</div>
		</>
	);
}
