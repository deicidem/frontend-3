import { Box, Button } from '@mui/material';

export default function HomePage() {
	return (
		<Box
			sx={{
				position: 'relative',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '12px',
			}}>
			<h1>Добро пожаловать!</h1>
			<Button variant='contained' href='/posts'>
				Читать статьи
			</Button>
		</Box>
	);
}
