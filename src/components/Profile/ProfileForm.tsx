import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { MutationTextField } from '@/shared/components/mutationsComponent';
import { HeaderText } from '@/shared/components';
import { ChangePasswordModal } from './ChangePasswordModal';
import { profileFormSchema } from './validation';
import s from './styled.module.scss';
import { User } from 'db';

interface ProfileFormProps {
	initialData: {
		firstName: string;
		lastName: string;
		email: string;
	};
	onSubmit: (data: User) => Promise<boolean>;
}

export const ProfileForm = ({ initialData, onSubmit }: ProfileFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	console.log(initialData);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: initialData,
		resolver: yupResolver(profileFormSchema),
	});

	const handleSaveClick = async () => {
		const data = (await handleSubmit(handleFormSubmit)()) as unknown as User;
		if (data) {
			handleFormSubmit(data);
		}
	};
	const handleFormSubmit = async (data: any) => {
		const success = await onSubmit(data);
		if (success) {
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		reset(initialData);
		setIsEditing(false);
	};

	return (
		<Box className={s.profileForm}>
			<HeaderText text='Профиль' size='h1' />

			<form onSubmit={handleSubmit(handleFormSubmit)} className={s.form}>
				<MutationTextField
					name='firstName'
					label='Имя'
					register={register}
					errors={errors}
					disabled={!isEditing}
					required
				/>
				<MutationTextField
					name='lastName'
					label='Фамилия'
					register={register}
					errors={errors}
					disabled={!isEditing}
					required
				/>
				<MutationTextField
					name='email'
					label='Email'
					register={register}
					errors={errors}
					disabled={!isEditing}
					required
				/>
				<Box className={s.buttons}>
					{!isEditing ? (
						<>
							<Button variant='contained' onClick={() => setIsEditing(true)}>
								Изменить информацию
							</Button>
							<Button
								variant='outlined'
								onClick={() => setIsPasswordModalOpen(true)}>
								Сменить пароль
							</Button>
						</>
					) : (
						<>
							<Button variant='contained' onClick={handleSaveClick}>
								Сохранить
							</Button>
							<Button variant='outlined' onClick={handleCancel}>
								Отмена
							</Button>
						</>
					)}
				</Box>
			</form>
			<ChangePasswordModal
				isOpen={isPasswordModalOpen}
				onClose={() => setIsPasswordModalOpen(false)}
			/>
		</Box>
	);
};
