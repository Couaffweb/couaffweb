export const getUserType = () => {
	let info = window.localStorage.getItem('authUser');
	info = JSON.parse(info);
	if (info) {
		return info.userType;
	}
	return false;
};

export const isUserLogin = () => {
	let info = window.localStorage.getItem('authUser');
	info = JSON.parse(info);
	if (info) {
		return true;
	}
	return false;
};

export const authInfo = () => {
	let info = window.localStorage.getItem('authUser');
	info = JSON.parse(info);
	if (info) {
		return info;
	}
	return false;
};

export const getAuthKey = () => {
	const authKey = window.localStorage.getItem('authKey');
	if (authKey) {
		return authKey;
	}
	return false;
};
export const setAuthKey = (key) => {
	window.localStorage.setItem('authKey', key);
};

export const setUserInfo = (loginInfo) => {
	window.localStorage.setItem('authUser', JSON.stringify(loginInfo));
};

export const removeAuth = (key = 'authUser') => {
	window.localStorage.removeItem(key);
};

export const alertMessage = ({ title, message, type = 'success' }) => ({
	title,
	message,
	type,
	insert: 'top',
	container: 'top-right',
	animationIn: ['animate__animated', 'animate__flipInX'],
	animationOut: ['animate__animated', 'animate__fadeOut'],
	dismiss: {
		duration: 5000,
		onScreen: true,
	},
});

export const apiURl =
	process.env.REACT_APP_API_URL ||
	`http://${window.location.hostname}:4001/apis/v1`;
