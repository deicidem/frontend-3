'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInFormSchema } from '@/shared/utils';
import { Box, Container } from '@mui/material';
import { HeaderText } from '@/shared/components';
import s from './styles.module.scss';
import { useMutation } from '@blitzjs/rpc';
import login from '@/features/auth/api/mutations/login';
import { useRouter } from 'next/navigation';
import { AuthenticationError } from 'blitz';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { authUserActions } from '@/app/store/slices/user';
import { AuthInputController } from './AuthInputController';
import { AuthButtons } from './AuthButtons';
export interface SignInFormValues {
	email: string;
	password: string;
}

export const SignInForm = () => {
	const router = useRouter();
	const [loginMutation] = useMutation(login);

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignInFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInFormSchema),
	});
	const dispatch = useAppDispatch();

	const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
		try {
			if (!values.email || !values.password) {
				throw new Error('Заполните email и пароль');
			}
			const loginData = {
				email: values.email,
				password: values.password,
			};
			const user = await loginMutation(loginData);
			if (user) {
				dispatch(
					authUserActions.setAuthUser({
						id: user.id,
						isAuth: true,
						role: user.role as 'CLIENT' | 'ADMIN',
					})
				);
				router.push('/');
			}
		} catch (error) {
			if (error instanceof AuthenticationError) {
				setError('email', {
					type: 'manual',
					message: 'Неверный email или пароль',
				});
				setError('password', {
					type: 'manual',
					message: 'Неверный email или пароль',
				});
			} else {
				setError('email', {
					type: 'manual',
					message:
						error instanceof Error
							? error.message
							: 'Произошла ошибка при входе',
				});
			}
		}
	};
	return (
		<Container component='main' className={s.wrapper}>
			<Box className={s.wrapper_content} sx={{ marginTop: '15%' }}>
				<HeaderText text='Войти' size='h1' />
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
					<Box
						component='form'
						onSubmit={handleSubmit(submitHandler)}
						noValidate
						className={s.wrapper_form}>
						<AuthInputController
							name='email'
							control={control}
							label='Введите почту'
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
						<AuthButtons
							isSubmitted={isSubmitted}
							isValid={isValid}
							isSubmitting={isSubmitting}
							signUp={false}
						/>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
