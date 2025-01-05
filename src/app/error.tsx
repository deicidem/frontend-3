'use client';
import { Box, Button } from '@mui/material';
import { BodyText, HeaderText } from '@/shared/components';

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '24px',
				padding: '20px',
				textAlign: 'center',
			}}>
			<HeaderText text='Что-то пошло не так' size='h1' />
			<BodyText text='Попробуйте снова позже или обновите страницу' size='l' />
			<Button variant='contained' onClick={reset}>
				Попробовать снова
			</Button>
		</Box>
	);
}
