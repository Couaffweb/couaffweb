import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Alert from 'sweetalert';
import { Form } from 'component';
const CheckOutForm = ({ onPayment, price }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState(null);
	const [cardComplete, setCardComplete] = useState(false);
	const [processing, setProcessing] = useState(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			Alert('error', 'Stripe not avaiable', 'error');
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
		const payload = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (payload.error) {
			setError(payload.error);
			Alert('error', 'Something went wrong', 'error');
		} else {
			console.log('[PaymentMethod]', payload.paymentMethod);
			onPayment(payload.paymentMethod);
		}
	};
	return (
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
	);
};

CheckOutForm.propType = {
	onPayment: PropTypes.func.isRequired,
	price: PropTypes.number.isRequired,
};

export default CheckOutForm;
