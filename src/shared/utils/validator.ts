import * as yup from 'yup';
import { SIGN_UP_FORM_SETTINGS } from '@/shared/constants';

export const signInFormSchema = yup
	.object()
	.shape({
		email: yup
			.string()
			.required('Email обязателен')
			.email('Введите корректный email')
			.trim(),
		password: yup
			.string()
			.required('Пароль обязателен')
			.min(6, 'Минимальная длина пароля - 6 символов'),
	})
	.required();

export const signUpFormSchema = yup.object({
	email: yup
		.string()
		.email(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.EMAIL)
		.required(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.EMAIL)
		.trim(),
	password: yup
		.string()
		.min(
			SIGN_UP_FORM_SETTINGS.BOUNDARIES.PASSWORD.MIN,
			SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MIN
		)
		.max(
			SIGN_UP_FORM_SETTINGS.BOUNDARIES.PASSWORD.MAX,
			SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MAX
		)
		.required(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.REQUIRED),
	firstName: yup
		.string()
		.required('Имя обязательно')
		.min(2, 'Имя должно быть не короче 2 символов')
		.max(50, 'Имя должно быть не длиннее 50 символов'),
	lastName: yup
		.string()
		.required('Фамилия обязательна')
		.min(2, 'Фамилия должна быть не короче 2 символов')
		.max(50, 'Фамилия должна быть не длиннее 50 символов'),
	isAdmin: yup.boolean().default(false),
});
