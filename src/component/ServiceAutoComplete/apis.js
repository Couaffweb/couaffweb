import { GET } from 'utils';
import { searchService } from 'constants/apiEndpoint';

export const searchAllServices = (search) =>
	GET(searchService, {
		search,
		limit: 6,
	});
