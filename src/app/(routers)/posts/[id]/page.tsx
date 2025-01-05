'use client';
import { Button } from '@mui/material';
import { Loader } from '@/shared/components';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@blitzjs/rpc';
import { Suspense } from 'react';
import getPostById from '@/features/post/api/queries/getPostById';
import { PostDetail } from '@/components/Posts/PostDetail/PostDetail';

export default function PostDetailPage() {
	const router = useRouter();
	const params = useParams();

	const id = params?.id as string;
	const [post, { isLoading, refetch }] = useQuery(getPostById, { id });
	if (isLoading || !post) {
		return <Loader />;
	}

	return (
		<>
			<Button variant='outlined' onClick={() => router.back()} sx={{ mb: 2 }}>
				Назад
			</Button>{' '}
			<Suspense fallback={<Loader />}>
				<PostDetail refetch={refetch} post={post} />
			</Suspense>
		</>
	);
}
