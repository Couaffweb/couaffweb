import { POST } from 'utils';
import { stripeConnect } from 'constants/apiEndpoint';
export const stripeConnectSuccess = (data) => POST(stripeConnect, data);
