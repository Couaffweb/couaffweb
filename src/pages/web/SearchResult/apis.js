import { GET } from 'utils';
import { searchAllServiceAndProvider } from 'constants/apiEndpoint';
export const resultSearch = (params) =>
	GET(searchAllServiceAndProvider, params);
