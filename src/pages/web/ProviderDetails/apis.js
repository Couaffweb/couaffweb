import { GET } from 'utils';
import { providerDetails } from 'constants/apiEndpoint';
export const providerService = (id, search = '') =>
	GET(providerDetails(id), { limit: 40, search });
