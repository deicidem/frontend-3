import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';

type TAuthButtonsProps = {
	isSubmitted: boolean;
	isValid: boolean;
	isSubmitting: boolean;
	signUp?: boolean;
};

export const AuthButtons = ({
	isSubmitted,
	isValid,
	isSubmitting,
	signUp = false,
}: TAuthButtonsProps) => {
	const router = useRouter();

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Button
				variant='contained'
				disabled={isSubmitted && (!isValid || isSubmitting)}
				type='submit'>
				{signUp ? 'Зарегистрироваться' : 'Войти'}
			</Button>
			<Button
				variant='text'
				onClick={() => router.push(signUp ? '/login' : '/signup')}>
				{signUp ? 'Войти' : 'Регистрация'}
			</Button>
		</Box>
	);
};
