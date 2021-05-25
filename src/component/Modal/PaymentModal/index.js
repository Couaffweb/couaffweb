import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Image } from 'component';
import CheckOutForm from './CheckOut';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const StripePaymentModal = ({ onClose, isShow, onPayment, price, ...rest }) => {
	return (
		<>
			<Elements stripe={stripePromise}>
				{isShow && (
					<div className='modal fade first_modal2 in show show-popup'>
						<div className='modal-dialog '>
							<div className='modal-content animate__animated animate__zoomIn'>
								<button type='button' className='close' onClick={onClose}>
									<Image url='/assest/images/cross.png' />
								</button>
								<h2 className='head1'> Stripe Payment </h2>
								<p className='head2'>Pay with Credit / Debit Card</p>
								<div className='modal-body'>
									<CheckOutForm onPayment={onPayment} price={price} {...rest} />
								</div>
							</div>
						</div>
					</div>
				)}
			</Elements>
		</>
	);
};

StripePaymentModal.propType = {
	onClose: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
	onPayment: PropTypes.func.isRequired,
	price: PropTypes.number.isRequired,
};

export default StripePaymentModal;
