import { GET, PUT } from 'utils';
import { bookings, bookingActions } from 'constants/apiEndpoint';
export const getAllBookings = (status = 0) =>
	GET(bookings, { limit: 30, status });

export const bookingStatusUpdate = (data) => PUT(bookingActions, data);
