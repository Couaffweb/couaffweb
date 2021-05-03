import { POST } from 'utils';
import { forgetPassword } from 'constants/apiEndpoint';
export const forGetPasswordUser = (data) => POST(forgetPassword, data);
