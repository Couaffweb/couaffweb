import { POST } from 'utils';
import { login } from 'constants/apiEndpoint';
export const userLogin = (data) => POST(login, data);
