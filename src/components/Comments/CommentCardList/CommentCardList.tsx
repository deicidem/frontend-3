'use client';
import { Box } from '@mui/material';
import { HeaderText, Loader } from '@/shared/components';
import { IComment } from '@/entities/comment';
import { CommentCard } from '../CommentCard/CommentCard';

export default function CommentCardList({
	comments,
	onDelete,
}: {
	comments: IComment[];
	onDelete: () => void;
}) {
	if (!comments) {
		return <Loader />;
	}

	return (
		<>
			<Box sx={{ mb: 1 }}>
				<HeaderText
					text={`Комментарии (${comments.length})`}
					size='h3'></HeaderText>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				{comments.map((item, index) => (
					<CommentCard
						comment={item}
						key={`${index}-card`}
						onDelete={onDelete}
					/>
				))}
			</Box>
		</>
	);
}
