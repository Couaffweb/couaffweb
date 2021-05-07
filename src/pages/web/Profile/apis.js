import { POST, Delete } from 'utils';
import {
	editProfile,
	changePassword,
	deleteAccount,
} from 'constants/apiEndpoint';
export const updateProfile = (data) => {
	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('phone', data.phone);
	formData.append('email', data.email);
	formData.append('profile', data.profile);
	if (parseInt(data.userType) === 1) {
		formData.append('location', data.location);
		formData.append('about_us', data.about_us);
	}
	formData.append('id', data.id);
	return POST(editProfile, formData);
};
export const updatePassword = (data) => POST(changePassword, data);
export const removeAccount = () => Delete(deleteAccount);
