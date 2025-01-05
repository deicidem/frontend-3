import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@blitzjs/rpc';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { HeaderText, Loader } from '@/shared/components';
import { MutationTextField } from '@/shared/components/mutationsComponent';
import { CommentFormData, TCommentFormData } from './types';
import { defaultCreateValues } from './helpers/defaultCreateValues';
import createComment from '@/features/post/api/mutations/createComment';

export const CommentForm = ({
	post,
	initialData,
	onSubmit: externalSubmit,
	submitButtonText = 'Добавить комментарий',
}: TCommentFormData) => {
	const router = useRouter();
	const [createCommentMutation] = useMutation(createComment);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CommentFormData>({
		defaultValues: initialData || defaultCreateValues,
	});

	const onSubmit = async (data: CommentFormData) => {
		try {
			const formattedData = {
				...data,
				postId: post.id,
			};

			await createCommentMutation(formattedData);
			toast.success('Комментарий создан!');
			if (externalSubmit) {
				externalSubmit(formattedData);
			}
			reset();
		} catch (error) {
			toast.error('Произошла ошибка при создании комментария');
			console.error('Error creating post:', error);
		}
	};

	return (
		<Suspense fallback={<Loader />}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '12px',
					}}>
					<HeaderText text={'Новый комментарий'} size='h4' />

					<form onSubmit={handleSubmit(onSubmit)}>
						<MutationTextField
							name='text'
							label='Текст'
							register={register}
							errors={errors}
							multiline
							fullWidth
							required
							rows={4}
						/>
						<Box
							sx={{
								mt: 1,
								display: 'flex',
								justifyContent: 'end',
								gap: '8px',
							}}>
							<Button variant='outlined' onClick={() => router.back()}>
								Отмена
							</Button>
							<Button type='submit' variant='contained'>
								{submitButtonText}
							</Button>
						</Box>
					</form>
				</Box>
			</LocalizationProvider>
		</Suspense>
	);
};
