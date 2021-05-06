import { POST } from 'utils';
import { bookService } from 'constants/apiEndpoint';
export const serviceBookProvide = (data) => POST(bookService, data);
