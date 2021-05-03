import { POST } from 'utils';
import { signup } from 'constants/apiEndpoint';
export const signupUser = (data) => POST(signup, data);
