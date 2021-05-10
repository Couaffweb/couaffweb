import { GET } from 'utils';
import { topRated } from 'constants/apiEndpoint';
export const TopRatedInfo = () => GET(topRated, { limit: 20 });
