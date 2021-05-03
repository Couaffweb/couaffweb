import { POST, GET } from 'utils';
import { service } from 'constants/apiEndpoint';
export const addService = (data) => {
	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('price', data.price);
	formData.append('category_id', data.category_id);
	formData.append('image', data.image);
	return POST(service, formData);
};

export const getAllService = () => GET(service, { limit: 30 });
