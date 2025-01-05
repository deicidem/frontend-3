'use client';
import { Box, Button } from '@mui/material';
import { HeaderText, Loader } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { withClientAuthHOC } from '@/shared/HOCS';
import { useQuery } from '@blitzjs/rpc';
import { Suspense } from 'react';
import s from './styled.module.scss';
import getUserPosts from '@/features/post/api/queries/getUserPosts';
import PostCardList from '@/components/Posts/PostCardList/PostCardList';

function ClientPostsList() {
	const router = useRouter();
	const [posts, { refetch }] = useQuery(getUserPosts, null);

	return (
		<Box className={s.wrapper}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '12px',
				}}>
				<HeaderText text='Мои посты' size='h1' />
				<Button
					variant='outlined'
					onClick={() => router.push('/client/managerPosts/create')}>
					Создать пост
				</Button>
			</Box>

			<Suspense fallback={<Loader />}>
				<PostCardList posts={posts} onDelete={refetch} />
			</Suspense>
		</Box>
	);
}

export default withClientAuthHOC(ClientPostsList);
