import React, { memo, useCallback, useState } from 'react';
import PorpTypes from 'prop-types';
import { getUserType, isUserLogin, alertMessage } from 'utils';
import { BookingModal, ReactLoading } from 'component';
import { store as notify } from 'react-notifications-component';
import Alert from 'sweetalert';
import { serviceBookProvide } from './apis';
const BookService = ({
	massagerId,
	services_ids,
	price,
	className = 'purify_3geqj2n36R8Dg7nylDdXsn purify_22UYJANSsr0z4osYrHmDD4 purify_13fyTWnkyZI2h3hIB4IlUq purify_Tf7q0lyTuYPyoIxLhB6IK purify_1bVBor9L1Nal5qAEUca1vS purify_1rkZUT9Q222TF1-HRC0qWi purify_jEiYoKzkRbjQsWvwUztCr',
}) => {
	const userType = getUserType();
	const [bookingPop, setBookingPop] = useState(false);
	const [loading, setLoading] = useState(false);
	const bookService = () => {
		if (!isUserLogin()) {
			if (typeof window.CustomEvent === 'function') {
				const event = new CustomEvent('isLogin', {
					detail: {
						isLogin: true,
					},
				});
				window.dispatchEvent(event);
				return false;
			}
			Alert('Login first to book service');
			return false;
		}
		setBookingPop(!bookingPop);
	};
	const hanldeSubmit = useCallback(
		(val) => {
			setLoading(true);
			const date = Math.round(
				new Date(`${val.date} ${val.time}`).getTime() / 1000,
				0
			);
			const bookingObj = {
				massagerId,
				services_ids: String(services_ids),
				price,
				date,
			};
			serviceBookProvide(bookingObj)
				.then(({ message, data }) => {
					Alert(
						'success',
						`${message}. Your booking ID is ${data.id}`,
						'success'
					);
				})
				.catch(({ message }) => {
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
	massagerId: PorpTypes.number.isRequired,
	services_ids: PorpTypes.number.isRequired,
	price: PorpTypes.number.isRequired,
	className: PorpTypes.string,
};

export default memo(BookService);
