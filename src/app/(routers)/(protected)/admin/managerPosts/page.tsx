'use client';
import { Box, Button } from '@mui/material';
import { HeaderText, Loader } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { withAdminAuthHOC } from '@/shared/HOCS';
import { useQuery } from '@blitzjs/rpc';
import { Suspense, useMemo, useState } from 'react';
import s from './styled.module.scss';
import { useSession } from '@blitzjs/auth';
import getAdminPosts from '@/features/post/api/queries/getAdminPosts';
import { IPost } from '@/entities/post';
import PostCardList from '@/components/Posts/PostCardList/PostCardList';

type FilterType = 'all' | 'created' | 'coauthor';
function AdminPostsList() {
	const router = useRouter();
	const session = useSession();
	const [posts, { refetch }] = useQuery(getAdminPosts, null);
	const [filter, setFilter] = useState<FilterType>('all');
	const currentIdUser = session.userId;

	const filteredPosts = useMemo(() => {
		if (!posts) return [];

		return posts.filter((post: IPost) => {
			switch (filter) {
				case 'created':
					return post.createdById === currentIdUser;
				default:
					return true;
			}
		});
	}, [posts, filter, currentIdUser]);

	return (
		<Box className={s.wrapper}>
			<Box className={s.header}>
				<HeaderText text='Посты' size='h1' />
				<Button
					variant='outlined'
					onClick={() => router.push('/admin/managerPosts/create')}>
					Создать пост
				</Button>
			</Box>

			<Box className={s.filterButtons}>
				<Button
					variant={filter === 'all' ? 'contained' : 'outlined'}
					onClick={() => setFilter('all')}>
					Все посты
				</Button>
				<Button
					variant={filter === 'created' ? 'contained' : 'outlined'}
					onClick={() => setFilter('created')}>
					Мои посты
				</Button>
			</Box>

			<Suspense fallback={<Loader />}>
				<PostCardList posts={filteredPosts} onDelete={refetch} />
			</Suspense>
		</Box>
	);
}

export default withAdminAuthHOC(AdminPostsList);
