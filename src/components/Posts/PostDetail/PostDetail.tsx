import { Box } from '@mui/material';
import { BodyText, HeaderText } from '@/shared/components';
import s from './styles.module.scss';
import { IPost } from '@/entities/post';
import CategoryList from '../Categories/CategoryList';
import CommentCardList from '@/components/Comments/CommentCardList/CommentCardList';
import { CommentForm } from '@/components/Comments/CommentForm/CommentForm';

export const findPostById = (posts: IPost[], id: string) => {
	return posts.find((post) => post.id === id);
};

type TPostDetailProps = {
	post: IPost;
	refetch: () => Promise<any>;
};

export const PostDetail = ({ post, refetch }: TPostDetailProps) => {
	return (
		<Box className={s.wrapper_block_text}>
			<Box sx={{ mb: 1 }}>
				<CategoryList categories={post.categories} />
			</Box>
			<Box sx={{ mb: 1 }}>
				<BodyText text={post.createdAt.toLocaleDateString()} size='p2' />
			</Box>
			<Box sx={{ mb: 3 }}>
				<HeaderText text={post.title} size='h1' />
			</Box>
			<BodyText text={post.description} size='p1' />
			<Box sx={{ mt: 2 }}>
				<CommentCardList comments={post.comments} onDelete={refetch} />
			</Box>

			<Box sx={{ mt: 2 }}>
				<CommentForm post={post} onSubmit={refetch} />
			</Box>
		</Box>
	);
};
