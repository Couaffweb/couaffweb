import React, { useState } from 'react';
import PorpTypes from 'prop-types';
import { getUserType, isUserLogin } from 'utils';
import Alert from 'sweetalert';

const BookService = ({ id }) => {
	const userType = getUserType();
	const [bookingPop, setBookingPop] = useState(false);
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
	return (
		<>
			{(userType === 0 || !isUserLogin()) && (
				<button
					className='purify_3geqj2n36R8Dg7nylDdXsn purify_22UYJANSsr0z4osYrHmDD4 purify_13fyTWnkyZI2h3hIB4IlUq purify_Tf7q0lyTuYPyoIxLhB6IK purify_1bVBor9L1Nal5qAEUca1vS purify_1rkZUT9Q222TF1-HRC0qWi purify_jEiYoKzkRbjQsWvwUztCr'
					onClick={bookService}
				>
					Book
				</button>
			)}
		</>
	);
};
BookService.propType = {
	id: PorpTypes.number.isRequired,
};

export default BookService;
