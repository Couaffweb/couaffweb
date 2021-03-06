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
	const authKey = window.localStorage.getItem('authKey');
	info = JSON.parse(info);
	if (info && authKey) {
		return true;
	}
	if (info) {
		window.localStorage.removeItem('authUser');
	}
	return false;
};
export const parseUrl = (queryParameter, key = '') => {
	if (key) {
		return new URLSearchParams(queryParameter).get(key);
	}
	return new URLSearchParams(queryParameter);
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
	process.env.REACT_APP_IS_DEV === 'true'
		? `${window.location.origin}/apis/v1`
		: `http://${window.location.hostname}:4001/apis/v1`;

export const getCurrentDay = (date) => {
	const allDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const today = new Date(date * 1000).getDay();
	return allDays[today];
};
export const addZero = (n) => {
	return (n < 10 ? '0' : '') + n;
};
export const dateFormate = (time) => {
	const date = new Date(time * 1000);
	const month = addZero(date.getMonth() + 1); //months (0-11)
	const day = addZero(date.getDate()); //day (1-31)
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
};
export const priceFormate = (price) => {
	return new Intl.NumberFormat('us', {
		style: 'currency',
		currency: 'usd',
	}).format(price);
};

export const spliceText = (text, count, isShowFull = false) => {
	if (text && !isShowFull) {
		return text.slice(0, count) + (text.length > count ? '...' : '');
	} else if (text && isShowFull) {
		return text;
	}
	return '';
};
export const hourFormate = (time) => {
	if (!time) return 'closed';
	if (time === 'closed') return time;
	const date = new Date();
	const hours = time.split(':');
	date.setHours(hours[0]);
	date.setMinutes(hours[1]);
	return date.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
};
