import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/hooks/storeHooks';
import { authUserSelectors } from '@/app/store/slices/user';
import s from './styled.module.scss';
import { useMutation } from '@blitzjs/rpc';
import { toast } from 'react-toastify';
import deletePost from '@/features/post/api/mutations/deletePost';
import { IPost } from '@/entities/post';
import { Dropdown } from '../Dropdown/Dropdown';

type TEditPostBtnProps = {
	post: IPost;
	onDelete?: () => void;
};

export const EditPostBtn = ({ post, onDelete }: TEditPostBtnProps) => {
	const currentPath = usePathname();
	const router = useRouter();

	const [isAdmin, setIsAdmin] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [showEditBtn, setShowEditBtn] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [deletePostMutation] = useMutation(deletePost);

	const user = useAppSelector(authUserSelectors.getUser);

	useEffect(() => {
		setIsAdmin(user.isAuth && user.role === 'ADMIN');
		setIsOwner(user.isAuth && user.id === post.createdById);
	}, [user, post]);

	useEffect(() => {
		if (isAdmin && currentPath === '/admin/managerPosts') {
			setShowEditBtn(true);
		} else if (isOwner && currentPath === '/client/managerPosts') {
			setShowEditBtn(true);
		} else {
			setShowEditBtn(false);
		}
	}, [currentPath, isAdmin, isOwner]);

	const idPost = post.id;
	const handleEdit = () => {
		if (isAdmin) {
			router.push(`/admin/managerPosts/edit/${idPost}`);
		} else {
			router.push(`/client/managerPosts/edit/${idPost}`);
		}
	};

	const handleDeleteClick = () => {
		setIsDeleteDialogOpen(true);
	};

	const handleConfirmDelete = async () => {
		try {
			await deletePostMutation({ id: post.id });
			toast.success('Пост успешно удалено');
			if (onDelete) {
				onDelete();
			} else {
				if (isAdmin) {
					router.push('/admin/managerPosts');
				} else {
					router.push('/client/managerPosts');
				}
			}
		} catch (error) {
			toast.error('Ошибка при удалении поста');
			console.error('Error deleting post:', error);
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

	if (showEditBtn)
		return (
			<>
				<Box className={s.menuBtn}>
					<Dropdown
						items={[
							{
								content: 'Изменить',
								onClick: handleEdit,
							},
							{
								content: 'Удалить',
								onClick: handleDeleteClick,
							},
						]}
					/>
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
							Вы уверены, что хотите удалить пост &quot;{post.title}&quot;? Это
							действие нельзя будет отменить.
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
