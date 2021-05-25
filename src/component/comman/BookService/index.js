import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserType, isUserLogin, alertMessage } from 'utils';
import { BookingModal, ReactLoading } from 'component';
import { store as notify } from 'react-notifications-component';
import Alert from 'sweetalert';
import { serviceBookProvide } from './apis';
const BookService = ({
	massagerId,
	services_ids,
	price,
	workingHours = {},
	className = 'purify_3geqj2n36R8Dg7nylDdXsn purify_22UYJANSsr0z4osYrHmDD4 purify_13fyTWnkyZI2h3hIB4IlUq purify_Tf7q0lyTuYPyoIxLhB6IK purify_1bVBor9L1Nal5qAEUca1vS purify_1rkZUT9Q222TF1-HRC0qWi purify_jEiYoKzkRbjQsWvwUztCr',
}) => {
	const userType = getUserType();
	const [bookingPop, setBookingPop] = useState(false);
	const [loading, setLoading] = useState(false);
	const bookService = () => {
		setBookingPop(!bookingPop);
	};
	const hanldeSubmit = useCallback(
		(val) => {
			let date = new Date(val.date);
			const selectedTime = new Date(val.time);
			date.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0);
			date = Math.round(new Date(date).getTime() / 1000, 0);
			const bookingObj = {
				massagerId,
				services_ids: String(services_ids),
				price,
				date,
				timeZone: val.timeZone,
			};
			if (!isUserLogin()) {
				setBookingPop(false);
				if (typeof window.CustomEvent === 'function') {
					const event = new CustomEvent('isLogin', {
						detail: {
							...bookingObj,
						},
					});
					window.dispatchEvent(event);
					return false;
				}
				Alert('Login first to book service');
				return false;
			}
			setLoading(true);
			serviceBookProvide(bookingObj)
				.then(({ message, data }) => {
					setBookingPop(false);
					Alert(
						'success',
						`${message}. Your booking ID is ${data.id}`,
						'success'
					);
				})
				.catch(({ message }) => {
					Alert('error', message, 'error');
					notify.addNotification(
						alertMessage({ title: 'error', message, type: 'danger' })
					);
				})
				.finally(() => {
					setLoading(false);
				});
		},
		[setLoading, massagerId, services_ids, price]
	);
	return (
		<>
			{bookingPop && (
				<BookingModal
					isShow={bookingPop}
					onClose={() => setBookingPop(false)}
					onSubmit={hanldeSubmit}
					workingHours={workingHours}
				/>
			)}
			<ReactLoading isShow={loading} />
			{(userType === 0 || !isUserLogin()) && (
				<button className={className} onClick={bookService}>
					Book
				</button>
			)}
		</>
	);
};
BookService.propType = {
	massagerId: PropTypes.number.isRequired,
	services_ids: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	className: PropTypes.string,
	workingHours: PropTypes.object,
};

export default memo(BookService);
