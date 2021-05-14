import { POST, GET, Delete, PUT } from 'utils';
import {
	service,
	removeService,
	editService,
	stripeConnect,
} from 'constants/apiEndpoint';
export const addService = (data) => {
	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('price', data.price);
	formData.append('category_id', data.category_id);
	formData.append('image', data.image);
	return POST(service, formData);
};

export const getAllService = () => GET(service, { limit: 30 });
export const deleteService = (id) => Delete(removeService(id));
export const updateService = (data) => {
	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('price', data.price);
	formData.append('category_id', data.category_id);
	formData.append('image', data.image);
	return PUT(editService(data.id), formData);
};

export const stripeConnectSuccess = (data) => POST(stripeConnect, data);
