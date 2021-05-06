import { GET } from 'utils';
import { bookings } from 'constants/apiEndpoint';
export const getAllBookings = (status = 0) =>
	GET(bookings, { limit: 30, status });
