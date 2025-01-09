import { THeaderLinks } from '@/features/header/ui/HeaderMenu/types';
import LoginIcon from '@mui/icons-material/Login';

export const headerLinksNoAuth: THeaderLinks[] = [
	{
		link: '/login',
		icon: <LoginIcon />,
	},
];
