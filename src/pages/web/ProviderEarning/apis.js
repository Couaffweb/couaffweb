import { GET, POST } from 'utils';
import {
	stripeConnect,
	getAllTransectionList,
	amountTranfer,
} from 'constants/apiEndpoint';
export const stripeConnectSuccess = (data) => POST(stripeConnect, data);
export const getTransectionHistory = (params) =>
	GET(getAllTransectionList, params);
export const tranferFund = () => POST(amountTranfer);
