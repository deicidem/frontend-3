import { Box, Typography } from '@mui/material';

export const Footer = () => {
	return (
		<Box
			component='footer'
			sx={{
				height: 'fit-content',
				py: 2,
				background: 'white',
				borderTop: '1px solid var(--background-gray)',
			}}>
			<Typography textAlign={'center'} variant='body2'>
				© {new Date().getFullYear()} CMS. Все права защищены.
			</Typography>
		</Box>
	);
};
