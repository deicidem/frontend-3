import { AppBar } from '@mui/material';
import { HeaderMenu } from './HeaderMenu/HeaderMenu';

export const Header = () => {
	return (
		<AppBar
			position='static'
			elevation={0}
			sx={{
				background: 'white',
				borderBottom: '1px solid var(--background-gray)',
			}}>
			<HeaderMenu />
		</AppBar>
	);
};
