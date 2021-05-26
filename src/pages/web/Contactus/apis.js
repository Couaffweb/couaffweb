import { POST } from 'utils';
import { contactUs } from 'constants/apiEndpoint';

export const submitContactForm = (data) => POST(contactUs, data);
