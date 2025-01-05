'use client';
import './postCardList.scss';
import { Box } from '@mui/material';
import { Loader } from '@/shared/components';
import { PostCard } from '../PostCard/PostCard';
import { IPost } from '@/entities/post';

export default function PostCardList({
	posts,
	onDelete,
}: {
	posts: IPost[];
	onDelete?: () => void;
}) {
	if (!posts) {
		return <Loader />;
	}

	return (
		<Box className='card-list-wrapper_cards'>
			{posts.map((item, index) => (
				<PostCard post={item} key={`${index}-card`} onDelete={onDelete} />
			))}
		</Box>
	);
}
