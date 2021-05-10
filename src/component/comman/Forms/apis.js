import { GET } from 'utils';
import { getAllCategories } from 'constants/apiEndpoint';
export const categoriesList = (limit = 100) => GET(getAllCategories, { limit });
