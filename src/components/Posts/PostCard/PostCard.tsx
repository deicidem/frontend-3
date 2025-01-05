'use client';
import s from './postCardStyled.module.scss';
import { BodyText, HeaderText } from '@/shared/components';
import { Box } from '@mui/material';
import Link from 'next/link';
import { IPost } from '@/entities/post';
import CategoryList from '../Categories/CategoryList';
import { EditPostBtn } from './components/EditPostBtn';

type TCardPostProps = {
	post: IPost;
	onDelete?: () => void;
};
export const PostCard = ({ post, onDelete }: TCardPostProps) => {
	return (
		<Link href={`/posts/${post.id}`} className={s.link}>
			<Box className={s.cardWrapper}>
				<EditPostBtn post={post} onDelete={onDelete} />
				<Box className={s.cardWrapper_info}>
					<Box display={'flex'} flexDirection={'column'} gap={'8px'}>
						<BodyText text={post.createdAt.toLocaleDateString()} size='p2' />
						<HeaderText text={post.title} size='h3' />
					</Box>
					<CategoryList categories={post.categories} />
				</Box>
			</Box>
		</Link>
	);
};
