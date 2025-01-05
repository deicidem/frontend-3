import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/hooks/storeHooks';
import { authUserSelectors } from '@/app/store/slices/user';
import { useMutation } from '@blitzjs/rpc';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { IComment } from '@/entities/comment';
import deleteComment from '@/features/post/api/mutations/deleteComment';
type TDeleteCommentButtonProps = {
	comment: IComment;
	onDelete?: () => void;
};

export const DeleteCommentButton = ({
	comment,
	onDelete,
}: TDeleteCommentButtonProps) => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [showBtn, setShowBtn] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [deleteCommentMutation] = useMutation(deleteComment);

	const user = useAppSelector(authUserSelectors.getUser);

	useEffect(() => {
		setIsAdmin(user.isAuth && user.role === 'ADMIN');
		setIsOwner(user.isAuth && user.id === comment.createdById);
	}, [user, comment]);

	useEffect(() => {
		if (isAdmin || isOwner) {
			setShowBtn(true);
		} else {
			setShowBtn(false);
		}
	}, [isAdmin, isOwner]);

	const handleDeleteClick = () => {
		setIsDeleteDialogOpen(true);
	};

	const handleConfirmDelete = async () => {
		try {
			await deleteCommentMutation({ id: comment.id });
			toast.success('Комментарий успешно удален');
			if (onDelete) {
				onDelete();
			}
		} catch (error) {
			toast.error('Ошибка при удалении комментария');
			console.error('Error deleting comment:', error);
		} finally {
			setIsDeleteDialogOpen(false);
		}
	};

	const preventEventPropagation = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const closeDialog = () => {
		setIsDeleteDialogOpen(false);
	};

	if (showBtn)
		return (
			<>
				<Box>
					<IconButton size='small' onClick={handleDeleteClick}>
						<DeleteIcon fontSize='small' />
					</IconButton>
				</Box>
				<Dialog
					open={isDeleteDialogOpen}
					onClose={closeDialog}
					onClick={preventEventPropagation}
					aria-labelledby='delete-dialog-title'
					aria-describedby='delete-dialog-description'>
					<DialogTitle id='delete-dialog-title'>
						Подтвердите удаление
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='delete-dialog-description'>
							Вы уверены, что хотите удалить комментарий? Это действие нельзя
							будет отменить.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button variant='outlined' onClick={closeDialog}>
							Отменить
						</Button>
						<Button variant='contained' onClick={handleConfirmDelete}>
							Удалить
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	else {
		return null;
	}
};
