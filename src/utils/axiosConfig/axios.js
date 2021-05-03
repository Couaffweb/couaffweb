import { create } from 'axios';
import { apiURl as baseURL, getAuthKey } from 'utils';
import { serverErrors } from './handleServerError';

export const axios = create({
	baseURL,
	headers: {
		common: { 'Content-Type': 'application/json' },
	},
});

axios.interceptors.response.use(
	(response) => successResponce(response),
	(error) => Promise.reject(serverErrors(error))
);

axios.interceptors.request.use(
	(config) => {
		const request = config;
		const key = getAuthKey();
		if (key) {
			request.headers.common['Authorization'] = key;
		}
		return request;
	},
	(error) => Promise.reject(error)
);

const successResponce = (result) => {
	const { data } = result;
	return data;
};
