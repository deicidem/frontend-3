'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { usePathname } from 'next/navigation';
import { Container } from '@mui/material';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export function AppLayout({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const [content, setContent] = useState<ReactNode>(children);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setContent(children);
		}, 500);
		return () => clearTimeout(timeout);
	}, [pathname, dispatch, children]);

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
