import { GET, POST } from 'utils';
import { stripeConnect, getAllTransectionList } from 'constants/apiEndpoint';
export const stripeConnectSuccess = (data) => POST(stripeConnect, data);
export const getTransectionHistory = (params) =>
	GET(getAllTransectionList, params);
