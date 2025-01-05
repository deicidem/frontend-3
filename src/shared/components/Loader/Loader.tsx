import { Box, CircularProgress } from '@mui/material';

export function Loader() {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<CircularProgress size={100} />
		</Box>
	);
}
