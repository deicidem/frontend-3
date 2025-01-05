'use client';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@blitzjs/rpc';
import { toast } from 'react-toastify';
import { withClientAuthHOC } from '@/shared/HOCS';
import { Loader } from '@/shared/components';
import getUserProfile from '@/features/user/api/queries/getUserProfile';
import updateUserProfile from '@/features/user/api/mutations/updateUserProfile';
import { User } from 'db';
import { ProfileForm } from '@/components/Profile/ProfileForm';

function ClientProfilePage() {
	const [userQuery] = useQuery(getUserProfile, null);
	const [userData, setUserData] = useState<typeof userQuery | null>(null);
	const [updateProfileMutation] = useMutation(updateUserProfile);

	useEffect(() => {
		if (userQuery) {
			setUserData(userQuery);
		}
	}, [userQuery]);

	const handleSubmit = async (data: User) => {
		try {
			const updatedUser = await updateProfileMutation(data);
			setUserData(updatedUser);
			toast.success('Профиль успешно обновлен');
			return true;
		} catch (error: any) {
			if (error.message === 'Email already in use') {
				toast.error('Этот email уже используется');
			} else {
				toast.error('Ошибка при обновлении профиля');
			}
			return false;
		}
	};
	if (!userData) {
		return <Loader />;
	}

	console.log('userData', userData);

	return <ProfileForm initialData={userData as User} onSubmit={handleSubmit} />;
}

export default withClientAuthHOC(ClientProfilePage);
