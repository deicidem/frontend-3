import { THeaderLinks } from '@/features/header/ui/HeaderMenu/types';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
export const headerLinksClient: THeaderLinks[] = [
	{
		link: '/client/managerPosts',
		icon: <EditIcon />,
	},
	{
		link: '/client/profile',
		icon: <PersonIcon />,
	},
];
