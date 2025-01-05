'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchema } from '@/shared/utils';
import { Box, Container } from '@mui/material';
import { HeaderText } from '@/shared/components';
import s from './styles.module.scss';
import { useMutation } from '@blitzjs/rpc';
import signup from '@/features/auth/api/mutations/signup';
import { useRouter } from 'next/navigation';
import { AuthInputController } from './AuthInputController';
import { AuthButtons } from './AuthButtons';

export interface SignUpFormValues {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
}

export const SignUpForm = () => {
	const router = useRouter();
	const [signupMutation] = useMutation(signup);

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		resolver: yupResolver(signUpFormSchema),
	});

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			await signupMutation(values);
			router.replace('/login');
		} catch (error: any) {
			if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
				setError('email', {
					type: 'manual',
					message: 'Этот email уже используется',
				});
			} else {
				setError('root', {
					type: 'manual',
					message:
						'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.',
				});
			}
		}
	};

	return (
		<Container component='main' className={s.wrapper}>
			<Box className={s.wrapper_content} sx={{ marginTop: '5%' }}>
				<HeaderText text='Регистрация' size='h1' />
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					className={s.wrapper_form}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}>
						<AuthInputController
							name='firstName'
							control={control}
							label='Введите имя'
							required
							errors={errors}
						/>
						<AuthInputController
							name='lastName'
							control={control}
							label='Введите фамилию'
							required
							errors={errors}
						/>
						<AuthInputController
							name='email'
							control={control}
							label='Введите email'
							required
							errors={errors}
						/>
						<AuthInputController
							name='password'
							control={control}
							label='Введите пароль'
							required
							errors={errors}
						/>
					</Box>
					<AuthButtons
						isSubmitted={isSubmitted}
						isValid={isValid}
						isSubmitting={isSubmitting}
						signUp={true}
					/>
				</Box>
			</Box>
		</Container>
	);
};
