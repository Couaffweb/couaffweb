import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Alert from 'sweetalert';
import { Form, Image } from 'component';
import { getStripeToken } from './apis';
const CheckOutForm = ({ onPayment, price, ...rest }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState(null);
	const [cardComplete, setCardComplete] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [clientSecret, setClientSecret] = useState();
	const [showError, setShowError] = useState(false);
	useEffect(() => {
		getStripeToken({
			amount: price * 100,
			order_id: rest.bookingId,
			shop_stripe_id: rest.massagerStripeId,
		})
			.then(({ data }) => {
				setClientSecret(data.secret);
			})
			.catch(() => {
				setShowError(true);
			})
			.finally(() => {
				setLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			Alert('error', 'Stripe not avaiable', 'error');
			return;
		}
		if (!clientSecret) {
			Alert('error', 'Stripe not avaiable for payment', 'error');
			return;
		}
		if (error) {
			elements.getElement('card').focus();
			return;
		}
		if (cardComplete) {
			setProcessing(true);
		}
		const cardElement = elements.getElement(CardElement);
		console.log(cardElement);
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardElement,
			},
		});

		if (payload.error) {
			console.log(payload.error);
			setError(payload.error);
			setProcessing(false);
			Alert('error', 'Something went wrong', 'error');
		} else {
			console.log('[PaymentMethod]', payload);
			onPayment({ id: rest.bookingId, index: rest.index, status: 3, payload });
		}
	};
	if (showError) {
		return (
			<div className='error-text-2'>Something went wrong. Please try later</div>
		);
	}
	return (
		<>
			{loading ? (
				<div className='error-text-2'>
					<Image url='/assest/images/loader.gif' />
				</div>
			) : (
				<Form onSubmit={handleSubmit} className='Form'>
					<div className='payment-div'>
						<CardElement
							options={{
								style: {
									base: {
										lineHeight: '24px',
										fontSize: '20px',
										color: '#424770',
										'::placeholder': {
											color: '#aab7c4',
										},
									},
									invalid: {
										color: '#9e2146',
									},
								},
							}}
							onChange={(e) => {
								setError(e.error);
								setCardComplete(e.complete);
							}}
						/>
					</div>

					<button
						className={`btn btn-primary btn-pay ${
							error ? 'SubmitButton--error' : ''
						}`}
						type='submit'
						disabled={processing || !stripe}
					>
						{`${processing ? 'Processing...' : `Pay $${price}`}`}
					</button>
				</Form>
			)}
		</>
	);
};

CheckOutForm.propType = {
	onPayment: PropTypes.func.isRequired,
	price: PropTypes.number.isRequired,
};

export default CheckOutForm;
