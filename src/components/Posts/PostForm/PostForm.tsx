import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@blitzjs/rpc';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createPost from '@/features/post/api/mutations/createPost';

import { HeaderText, Loader } from '@/shared/components';
import { MutationTextField } from '@/shared/components/mutationsComponent';
import s from './styled.module.scss';
import { SelectCategories } from '../CategorySelectField/SelectCategories';
import { PostFormData, TPostFormProps } from './types';
import { defaultCreateValues } from './helpers/defaultCreateValues';

export const PostForm = ({
	initialData,
	onSubmit: externalSubmit,
	submitButtonText = 'Создать пост',
}: TPostFormProps) => {
	const router = useRouter();
	const [createPostMutation] = useMutation(createPost);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<PostFormData>({
		defaultValues: initialData || defaultCreateValues,
	});

	const [categories, setCategoriesData] = useState<ICategory[]>([]);

	useEffect(() => {
		if (initialData) {
			if (Array.isArray(initialData.categoryIds)) {
				setValue('categoryIds', initialData.categoryIds);
			}
		}
	}, [initialData, categories]);

	const onSubmit = async (data: PostFormData) => {
		try {
			const formattedData = {
				...data,
			};

			if (externalSubmit) {
				await externalSubmit(formattedData);
			} else {
				await createPostMutation(formattedData);

				toast.success(initialData ? 'Пост обновлен!' : 'Пост создан!');
				router.push('/admin/managerPosts');
			}
		} catch (error) {
			toast.error(
				initialData
					? 'Произошла ошибка при обновлении поста'
					: 'Произошла ошибка при создании поста'
			);
			console.error('Error creating post:', error);
		}
	};

	return (
		<Suspense fallback={<Loader />}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box className={s.formWrapper}>
					<HeaderText
						text={initialData ? 'Редактирование поста' : 'Создание поста'}
						size='h1'
					/>

					<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
						<MutationTextField
							name='title'
							label='Заголовок'
							register={register}
							required
							errors={errors}
						/>

						<MutationTextField
							name='description'
							label='Контент'
							register={register}
							errors={errors}
							multiline
							fullWidth
							required
							rows={4}
						/>

						<SelectCategories
							categories={categories}
							onSetCategoriesData={setCategoriesData}
							errors={errors}
							control={control}
						/>

						<Box className={s.buttons}>
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
