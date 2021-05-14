const ApiController = require('./ApiController');
const Db = require('../../../libary/sqlBulider');
const ApiError = require('../../Exceptions/ApiError');
const helper = new ApiController();
const DB = new Db();

const findMassagerById = async (id) => {
	const users = await DB.find('users', 'first', {
		conditions: {
			id,
			userType: 1,
		},
	});
	if (!users) throw new ApiError('Invaild massager id', 422);
	return users;
};

const makeBookingArray = (data) => {
	return data.map(
		({
			serviceDetails = null,
			paymentDetails = null,
			paymentStatus,
			date,
			status,
			price,
			created,
			modified,
			id,
			userId,
			massagerId,
			massagerName,
			massagerEmail,
			massagerPhone,
			massagerProfile,
			massagerLocation,
			totalRating,
			userName,
			userEmail,
			userPhone,
			userProfile,
			massagerWorkingExperience,
			massagerWorkingHour,
			isReview,
			massagerStripeId,
		}) => {
			if (serviceDetails) {
				serviceDetails = JSON.parse(serviceDetails);
			}
			if (paymentDetails) {
				paymentDetails = JSON.parse(paymentDetails);
			}
			if (massagerWorkingHour) {
				massagerWorkingHour = JSON.parse(massagerWorkingHour);
			}
			if (userProfile) {
				userProfile = global.appURL + 'uploads/' + userProfile;
			}
			if (massagerProfile) {
				massagerProfile = global.appURL + 'uploads/' + massagerProfile;
			}
			return {
				userInfo: {
					userId,
					userName,
					userEmail,
					userPhone,
					userProfile,
				},
				massagerInfo: {
					massagerId,
					massagerName,
					massagerEmail,
					massagerPhone,
					massagerProfile,
					massagerLocation,
					totalRating,
					massagerWorkingExperience,
					massagerWorkingHour,
					massagerStripeId,
				},
				bookingInfo: {
					serviceDetails,
					paymentDetails,
					paymentStatus,
					status,
					price,
					created,
					modified,
					id,
					userId,
					massagerId,
					date,
					isReview,
				},
			};
		}
	);
};

const checkBookingId = async (id, massagerId, userType) => {
	const condition = {
		conditions: {
			id,
		},
	};
	if (userType === 0) {
		Object.assign(condition, { userId: massagerId });
	} else {
		Object.assign(condition, { massagerId });
	}
	const bookingInfo = await DB.find('bookServices', 'first', condition);
	if (!bookingInfo) throw new ApiError('Invaild booking id', 422);
	if (bookingInfo.serviceDetails) {
		bookingInfo.serviceDetails = JSON.parse(bookingInfo.serviceDetails);
	}
	if (bookingInfo.paymentDetails) {
		bookingInfo.paymentDetails = JSON.parse(bookingInfo.paymentDetails);
	}
	return bookingInfo;
};

const checkAllServices = async (serviceId) => {
	const services = await DB.first(
		`select services.*, IF(services.image, concat('${global.appURL}uploads/',services.image), '') as image from services where id in (${serviceId})`
	);
	if (services.length !== serviceId.split(',').length)
		throw new ApiError('Invaild service id');
	return JSON.stringify(services);
};

exports.bookService = async ({
	body: { massagerId, user_id, services_ids, price, userInfo, date },
}) => {
	const data = await helper.vaildation({
		massagerId,
		userId: user_id,
		services_ids,
		price,
		date,
	});
	await findMassagerById(massagerId);
	Object.assign(data, { serviceDetails: await checkAllServices(services_ids) });
	data.id = await DB.save('bookServices', data);
	setTimeout(() => {
		const { name } = userInfo;
		data.notification_code = 4;
		sendPush(massagerId, data, `${name} send a booking request`);
	}, 100);
	data.serviceDetails = JSON.parse(data.serviceDetails);
	return {
		message: 'Booking successfully. Please wait for approval',
		status: 201,
		data,
	};
};

exports.acceptBooking = async ({
	body: {
		bookingId,
		status,
		user_id,
		userInfo: { userType },
		paymentDetails = null,
	},
}) => {
	await helper.vaildation({
		bookingId,
		status,
	});
	const bookingInfo = await checkBookingId(bookingId, user_id, userType);
	if ([1, 2, 3, 4].indexOf(parseInt(status)) === -1)
		throw new ApiError('Please select the correct status type');
	const bookingObject = { id: bookingId, status };
	let message =
		'Booking request accepted. Please do payment for further proccess';
	let notification_code = 2;
	if (parseInt(status) === 2) {
		notification_code = 3;
		message = 'Request delete';
	}
	if (parseInt(status) === 3) {
		if (paymentDetails) {
			Object.assign(bookingObject, {
				paymentDetails: JSON.stringify(paymentDetails),
				paymentStatus: 1,
			});
		}
		notification_code = 4;
		message = 'Booking complete';
	}

	await DB.save('bookServices', bookingObject);
	bookingInfo.status = status;
	setTimeout(() => {
		const { userId } = bookingInfo;
		bookingInfo.notification_code = notification_code;
		sendPush(userId, bookingInfo, message);
	}, 100);
	return {
		message,
		data: bookingInfo,
	};
};

exports.getBookings = async ({
	body: {
		userInfo: { userType, id },
	},
	query: { page = 1, limit = 20, status = 0 },
}) => {
	const offset = (page - 1) * limit;
	const condition = {
		conditions: {
			raw: [`bookServices.status in (${status})`],
		},
		join: [
			'users as massager on (massager.id = bookServices.massagerId)',
			'users on (users.id = bookServices.userId)',
		],
		fields: [
			'massager.name as massagerName',
			'massager.email as massagerEmail',
			'massager.phone as massagerPhone',
			'massager.profile as massagerProfile',
			'massager.location as massagerLocation',
			'massager.working_hours as massagerWorkingHour',
			'massager.stripe_id as massagerStripeId',
			'massager.workingExperience as massagerWorkingExperience',
			`(select round(avg(rating),1) as rating from ratings where massagerId=massager.id) as totalRating`,
			`(select count(*) as rating from ratings where bookingId=bookServices.id and userId = ${id}) as isReview`,
			'users.name as userName',
			'users.email as userEmail',
			'users.phone as userPhone',
			'users.profile as userProfile',
			'bookServices.*',
		],
		limit: [offset, limit],
		orderBy: ['bookServices.id desc'],
	};
	if (userType === 1) {
		Object.assign(condition.conditions, {
			massagerId: id,
		});
	} else {
		Object.assign(condition.conditions, {
			userId: id,
		});
	}
	const allBooking = await DB.find('bookServices', 'all', condition);
	const pagination = await helper.Paginations(
		'bookServices',
		condition,
		page,
		limit
	);
	return {
		message: 'booking list',
		data: {
			pagination,
			bookings: makeBookingArray(allBooking),
		},
	};
};

exports.bookingDetails = async ({
	body: {
		userInfo: { userType, id },
	},
	params: { bookingId },
}) => {
	const condition = {
		conditions: {
			raw: [`bookServices.id = ${bookingId}`],
		},
		join: [
			'users as massager on (massager.id = bookServices.massagerId)',
			'users on (users.id = bookServices.userId)',
		],
		fields: [
			'massager.name as massagerName',
			'massager.email as massagerEmail',
			'massager.phone as massagerPhone',
			'massager.profile as massagerProfile',
			'massager.location as massagerLocation',
			'massager.working_hours as massagerWorkingHour',
			'massager.stripe_id as massagerStripeId',
			'massager.workingExperience as massagerWorkingExperience',
			`(select round(avg(rating),1) as rating from ratings where massagerId=massager.id) as totalRating`,
			`(select count(*) as rating from ratings where bookingId=bookServices.id and userType = ${userType}) as isReviewed`,
			'users.name as userName',
			'users.email as userEmail',
			'users.phone as userPhone',
			'users.profile as userProfile',
			'bookServices.*',
		],
		limit: 1,
		order: ['bookServices.id desc'],
	};
	if (userType === 1) {
		Object.assign(condition.conditions, {
			massagerId: id,
		});
	} else {
		Object.assign(condition.conditions, {
			userId: id,
		});
	}
	const bookingDetails = await DB.find('bookServices', 'all', condition);
	if (bookingDetails.length === 0) {
		throw new ApiError('Invaild Booking id');
	}
	const data = makeBookingArray(bookingDetails);
	return {
		message: 'booking details',
		data: data[0],
	};
};
const sendPush = (id, body, message) => {
	helper.sendPush(
		{ notification_code: body.notification_code, body, message },
		id
	);
};
