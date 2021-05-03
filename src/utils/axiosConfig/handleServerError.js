import { RollbarErrorTracking } from 'utils/rollbar';

export const serverErrors = ({
	response,
	request,
	message,
	config,
	response: { data, data: { error = {} } = {}, status } = {},
} = {}) => {
	switch (true) {
		case status === 401:
			window.localStorage.removeItem('authUser');
			return window.location.replace('/');
		case response && data && status >= 400 && status <= 499:
			return returnErrorObject(
				true,
				{ ...error, status },
				error.message,
				false,
				status
			);

		case response && status >= 500:
			RollbarErrorTracking.logErrorInRollbar(
				`Error come on this request ${request.responseURL}, message:${message}`
			);
			return returnErrorObject(
				false,
				null,
				'Internal Server Error',
				true,
				status
			);

		case !response && request:
			return returnErrorObject(false, null, request, false, status);

		case !!message:
			return returnErrorObject(false, null, message, false, status);

		default:
			return returnErrorObject(false, null, config, false, status);
	}
};

const returnErrorObject = (
	clientError,
	errorDetails,
	message,
	serverError,
	status
) => ({
	clientError,
	errorDetails,
	message,
	serverError,
	status,
});
