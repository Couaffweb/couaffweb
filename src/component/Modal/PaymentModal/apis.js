import { POST } from 'utils';
import { stripePaymentToken } from 'constants/apiEndpoint';

export const getStripeToken = (data) => POST(stripePaymentToken, data);
