import { POST } from 'utils';
import { otpVerify } from 'constants/apiEndpoint';
export const verifyOTP = (data) => POST(otpVerify, data);
