import { GET } from 'utils';
import { providerDetails, ratings } from 'constants/apiEndpoint';
export const providerService = (id, search = '') =>
	GET(providerDetails(id), { limit: 40, search });
export const getRatings = (id) => GET(ratings(id), { limit: 20 });
