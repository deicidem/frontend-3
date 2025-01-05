'use client';
import { Box, Container, IconButton } from '@mui/material';
import Link from 'next/link';
import { HeaderText } from '@/shared/components';
import { useSession } from '@blitzjs/auth';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { headerLinksNoAuth } from '../constants/headerLinksNoAuth';
import { headerLinksAdmin } from '../constants/headerLinksAdmin';
import { headerLinksClient } from '../constants/headerLinksClient';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { THeaderLinks } from './types';

export const HeaderMenu = () => {
	const session = useSession();
	const pathname = usePathname();

	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [prevUserId, setPrevUserId] = useState(session.userId);

	useEffect(() => {
		if (prevUserId && !session.userId) {
			setIsLoggingOut(true);
		} else if (!prevUserId && session.userId) {
			setIsLoggingOut(false);
		}
		setPrevUserId(session.userId);
	}, [session.userId, prevUserId]);

	const navLinks: THeaderLinks[] = useMemo(() => {
		if (!session.userId) return headerLinksNoAuth;
		return session.role === 'ADMIN' ? headerLinksAdmin : headerLinksClient;
	}, [session]);

	return (
		<>
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: '60px',
				}}>
				<Link href='/' onClick={(e) => pathname === '/' && e.preventDefault()}>
					<HeaderText text='CMS' size='h3' color='black' />
				</Link>
				<Box sx={{ color: 'black' }}>
					{navLinks.map((item) => (
						<IconButton
							color='inherit'
							href={item.link as string}
							key={`${item.link}`}
							onClick={(e) => pathname === item.link && e.preventDefault()}>
							{item.icon}
						</IconButton>
					))}
					{(session.userId || isLoggingOut) && <LogoutButton />}
				</Box>
			</Container>
		</>
	);
};
