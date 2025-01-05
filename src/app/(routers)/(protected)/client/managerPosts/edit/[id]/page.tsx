'use client';
import { withClientAuthHOC } from '@/shared/HOCS';
import { Loader } from '@/shared/components';
import { useQuery } from '@blitzjs/rpc';
import { useParams } from 'next/navigation';
import getPostById from '@/features/post/api/queries/getPostById';
import { PostForm } from '@/components/Posts/PostForm/PostForm';
import { PostFormData } from '@/components/Posts/PostForm/types';

function EditPostPage() {
	const params = useParams();
	const postId = params?.id as string;

	const [post, { isLoading }] = useQuery(getPostById, { id: postId });

	if (isLoading) {
		return <Loader />;
	}

	if (!post) {
		return <div>Пост не найден</div>;
	}

	const initialFormData: PostFormData = {
		id: post.id,
		title: post.title,
		description: post.description || '',
		categoryIds: post.categories.map((cat) => cat.id),
		createdById: post.createdById,
	};

	return (
		<PostForm initialData={initialFormData} submitButtonText='Обновить пост' />
	);
}

export default withClientAuthHOC(EditPostPage);
