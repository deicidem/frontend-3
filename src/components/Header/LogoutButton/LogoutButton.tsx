import logout from '@/features/auth/api/mutations/logout';
import { useMutation } from '@blitzjs/rpc';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { IconButton } from '@mui/material';
import { authUserActions } from '@/app/store/slices/user';
import LogoutIcon from '@mui/icons-material/Logout';
export const LogoutButton = () => {
	const dispatch = useAppDispatch();
	const [logoutMutation] = useMutation(logout);

	const handleLogout = async () => {
		try {
			await logoutMutation();
			window.location.href = '/login';
			dispatch(authUserActions.clearAuthUser());
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	return (
		<IconButton color='inherit' aria-label='logout' onClick={handleLogout}>
			<LogoutIcon />
		</IconButton>
	);
};
