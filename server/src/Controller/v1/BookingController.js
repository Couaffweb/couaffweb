const ApiController = require('./ApiController');
const Db = require('../../../libary/sqlBulider');
const ApiError = require('../../Exceptions/ApiError');
const app = require('../../../libary/CommanMethod');
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
	if (users.working_hours) {
		users.working_hours = JSON.parse(users.working_hours);
	}
	return users;
};

const checkingBookingSlots = async (massagerId, date) => {
	const getBookingByDate = await DB.find('bookServices', 'all', {
		conditions: {
			massagerId,
			raw: [
				`from_unixtime(date, "%y%d%m") = from_unixtime(${date}, "%y%d%m") and status in (0,1,3)`,
			],
		},
		fields: [
			'bookServices.date+3600 as endTime, bookServices.date as startTime',
		],
	});
	getBookingByDate.forEach((val) => {
		if (val.startTime >= date || date < val.endTime) {
			throw new ApiError('Selected slot is not free', 403);
		}
	});
};

const checkingWorkingHours = (workingHours = [], bookingDate) => {
	if (!workingHours) {
		throw new ApiError('Working hours not avaiable');
	}
	workingHours = JSON.parse(workingHours);
	const todayWorkingHour = workingHours.find(
		(val) => val.day === app.getCurrentDay(bookingDate)
	);
	const openTime = new Date(bookingDate * 1000);
	const openHours = todayWorkingHour.openTime.split(':');
	openTime.setHours(openHours[0], openHours[1], 0);
	const openUnixTime = Math.round(openTime.getTime() / 1000, 0);
	const closeTime = new Date(bookingDate * 1000);
	const closeHours = todayWorkingHour.closeTime.split(':');
	closeTime.setHours(closeHours[0], closeHours[1], 0);
	const closeUnixTime = Math.round(closeTime.getTime() / 1000, 0);
	console.log(openUnixTime, closeUnixTime, bookingDate);
	if (openUnixTime > bookingDate || bookingDate > closeUnixTime - 3600) {
		throw new ApiError(
			'Provider not provide the service on your selected time. Please choice different one',
			400
		);
	}
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
const addTransectionInfo = async (data) => {
	const percent = (10 / 100) * data.amount;
	data.amount = data.amount - percent;
	const providerInfo = await DB.find('users', 'first', {
		conditions: {
			id: data.userId,
		},
		fields: ['id', 'walletAmount'],
	});
	const { walletAmount, id } = providerInfo;
	data.totalBalance = parseFloat(walletAmount + data.amount);
	await DB.save('transactions', data);
	await DB.save('users', {
		id,
		walletAmount: data.totalBalance,
	});
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
	const { working_hours = [] } = await findMassagerById(massagerId);
	await checkingWorkingHours(working_hours, date);
	await checkingBookingSlots(massagerId, date);
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
		addTransectionInfo({
			userId: bookingInfo.massagerId,
			bookingId,
			amount: bookingInfo.price,
			transactionInfo: JSON.stringify(paymentDetails),
		});
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
