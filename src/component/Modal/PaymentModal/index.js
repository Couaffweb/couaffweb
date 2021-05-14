import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Image } from 'component';
import CheckOutForm from './CheckOut';
const stripePromise = loadStripe(
	'pk_test_51IpQS6AplERnGLwpLTjC8zaIX1SebuG8bY9rhL6K9clUcuKOt7rtEvIlljY2LVo2nRdfKmzzGkUeqhZy4zKkzK1Y00ZGXnWYC0'
);
const StripePaymentModal = ({ onClose, isShow, onPayment, price }) => {
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
								<p className='head2'>
									Please add your card details for complete payment
								</p>
								<div className='modal-body'>
									<CheckOutForm onPayment={onPayment} price={price} />
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
