'use client';
import { BodyText } from '@/shared/components';
import { Box } from '@mui/material';
import { IComment } from '@/entities/comment';
import { DeleteCommentButton } from './DeleteCommentButton';

type TCardPostProps = {
	comment: IComment;
	onDelete?: () => void;
};
export const CommentCard = ({ comment, onDelete }: TCardPostProps) => {
	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
					<BodyText
						text={comment.createdAt.toLocaleDateString()}
						size='p2'
						color='var(--text-secondary)'
					/>
					<BodyText
						text={`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
						size='p2'
					/>
				</Box>
				<DeleteCommentButton comment={comment} onDelete={onDelete} />
			</Box>
			<BodyText text={comment.text} size='p1' />
			<Box
				sx={{
					mt: 1,
					width: '100%',
					borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
				}}
			/>
		</Box>
	);
};
