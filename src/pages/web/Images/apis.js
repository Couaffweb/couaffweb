import { GET, POST, Delete } from 'utils';
import {
	addImageProvider,
	removeProviderImage,
	getProviderImages,
} from 'constants/apiEndpoint';

export const getAllImages = () => GET(getProviderImages);
export const addProviderImage = (data) => {
	const form = new FormData();
	form.append('image', data.image);
	return POST(addImageProvider, form);
};

export const removeImage = (id) => Delete(removeProviderImage(id));
