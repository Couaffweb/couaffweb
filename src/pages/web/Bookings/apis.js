import { GET, PUT, POST } from 'utils';
import { bookings, bookingActions, ratings } from 'constants/apiEndpoint';
export const getAllBookings = (status = 0) =>
	GET(bookings, { limit: 30, status });

export const bookingStatusUpdate = (data) => PUT(bookingActions, data);
export const giveRatings = (data) => POST(ratings(0), data);
