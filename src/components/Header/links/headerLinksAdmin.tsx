import { THeaderLinks } from '@/features/header/ui/HeaderMenu/types';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

export const headerLinksAdmin: THeaderLinks[] = [
	{
		link: '/admin/managerPosts',
		icon: <EditIcon />,
	},
	{
		link: '/admin',
		icon: <PersonIcon />,
	},
];
