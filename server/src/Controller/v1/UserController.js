const ApiController = require('./ApiController');
const app = require('../../../libary/CommanMethod');
const Db = require('../../../libary/sqlBulider');
const ApiError = require('../../Exceptions/ApiError');
const { lang } = require('../../../config');
const DB = new Db();

class UserController extends ApiController {
	constructor() {
		super();
		this.addUser = this.addUser.bind(this);
		this.loginUser = this.loginUser.bind(this);
	}

	async addUser(Request) {
		const { RequestData } = Request;
		if (Request.files && Request.files.profile) {
			RequestData.profile = await app.upload_pic_with_await(
				Request.files.profile
			);
		}
		const { serviceId, userType, working_hours } = RequestData;
		if (working_hours && parseInt(userType) === 1) {
			RequestData.working_hours = JSON.stringify(working_hours);
		}
		const userId = await DB.save('users', RequestData);
		if (serviceId) {
			const allService = serviceId.split(',');
			allService.forEach((val) => {
				DB.save('user_services', {
					userId,
					serviceId: val,
					userType,
				});
			});
		}

		RequestData.lang = Request.lang;
		setTimeout(() => {
			this.mails(RequestData);
		}, 100);
		return {
			message: lang[Request.lang].signup,
			data: await super.userDetails(userId),
		};
	}
	async verifyOtp(req) {
		const required = {
			otp: req.body.otp,
		};
		const request_data = await super.vaildation(required, {});
		if (parseInt(request_data.otp) !== req.body.userInfo.otp) {
			throw new ApiError(lang[req.lang].invaildOtp);
		}
		req.body.userInfo.status = 1;
		await DB.save('users', req.body.userInfo);
		const usersInfo = await super.userDetails(req.body.userInfo.id);
		return {
			message: lang[req.lang].verifyOtp,
			data: usersInfo,
		};
	}

	async soicalLogin(req) {
		const required = {
			social_id: req.body.social_id,
			social_token: req.body.social_token,
			soical_type: req.body.soical_type,
		};
		const non_required = {
			device_type: req.body.device_type,
			device_token: req.body.device_token,
			name: req.body.name,
			phone: req.body.phone,
			email: req.body.email,
			status: 1,
			authorization_key: app.createToken(),
		};

		let request_data = await super.vaildation(required, non_required);
		let soical_id = await DB.find('users', 'first', {
			conditions: {
				or: {
					email: request_data.email,
					social_id: request_data.social_id,
				},
			},
			fields: ['id'],
		});
		if (soical_id) {
			request_data.id = soical_id.id;
		}
		const id = await DB.save('users', request_data);
		const userInfo = await super.userDetails(id);
		if (userInfo.status === 0)
			throw new ApiError('your account deactive by admin');
		return {
			message: 'User login successfully',
			data: userInfo,
		};
	}

	async forgotPassword(req) {
		const required = {
			email: req.body.email,
		};

		const request_data = await super.vaildation(required, {});
		const user_info = await DB.find('users', 'first', {
			conditions: {
				email: request_data.email,
			},
			fields: ['id', 'email', 'name'],
		});
		if (!user_info) throw new ApiError(lang[req.lang].mailNotFound);
		user_info.forgot_password_hash = app.createToken();
		await DB.save('users', user_info);
		const mail = {
			to: request_data.email,
			subject: 'Forgot Password',
			template: 'forgot_password',
			data: {
				first_name: user_info.name,
				last_name: user_info.name,
				url:
					global.appURL +
					'users/change_password/' +
					user_info.forgot_password_hash,
			},
		};
		setTimeout(() => {
			app.send_mail(mail);
		}, 100);
		return {
			message: lang[req.lang].otpSend,
			data: [],
		};
	}

	async loginUser(req) {
		const required = {
			email: req.body.email,
			password: req.body.password,
			userType: req.body.userType,
		};
		const non_required = {
			device_type: req.body.device_type || 0,
			device_token: req.body.device_token || '',
			last_login: app.currentTime,
			authorization_key: app.createToken(),
		};

		let request_data = await super.vaildation(required, non_required);
		let login_details = await DB.find('users', 'first', {
			conditions: {
				email: request_data.email,
				userType: request_data.userType,
			},
			fields: ['id', 'password', 'status', 'email'],
		});
		if (login_details) {
			if (request_data.password !== login_details.password)
				throw new ApiError(lang[req.lang].wrongLogin);
			if (login_details.status === 0)
				throw new ApiError('your account deactive by admin');
			delete login_details.password;
			request_data.id = login_details.id;
			await DB.save('users', request_data);
			login_details.authorization_key = request_data.authorization_key;
			login_details = await super.userDetails(login_details.id);
			return {
				message: lang[req.lang].LoginMessage,
				data: login_details,
			};
		}
		throw new ApiError(lang[req.lang].wrongLogin);
	}

	async appInfo() {
		const app_info = await DB.find('app_informations', 'all');
		return {
			message: 'App Informations',
			data: app_info,
		};
	}
	async changePassword(req) {
		const required = {
			old_password: req.body.old_password,
			new_password: req.body.new_password,
		};
		const request_data = await super.vaildation(required, {});
		const loginInfo = req.body.userInfo;
		if (loginInfo.password !== request_data.old_password) {
			throw new ApiError(lang[req.lang].oldPassword);
		}
		loginInfo.password = request_data.new_password;
		await DB.save('users', loginInfo);
		return {
			message: 'Password change Successfully',
			data: [],
		};
	}
	async updateProfile(req) {
		const required = {
			id: req.body.user_id,
		};
		const non_required = {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			location: req.body.location,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			workingExperience: req.body.workingExperience,
			working_hours: req.body.working_hours,
			about_us: req.body.about_us,
		};
		const request_data = await super.vaildation(required, non_required);
		if (request_data.working_hours) {
			request_data.working_hours = JSON.stringify(request_data.working_hours);
		}
		if (request_data.email) {
			const checkEmail = await DB.first(
				`select email from users where email= '${request_data.email}' and id != ${request_data.id} limit 1`
			);
			if (checkEmail.length > 0) {
				throw new ApiError(
					`this email already register please choice anotherone`,
					422
				);
			}
		}
		if (request_data.phone) {
			const checkPhone = await DB.first(
				`select phone from users where phone= '${request_data.phone}' and id != ${request_data.id} limit 1`
			);
			if (checkPhone.length > 0) {
				throw new ApiError(
					`this phone already register please choice anotherone`,
					422
				);
			}
		}

		if (req.files && req.files.profile) {
			request_data.profile = await app.upload_pic_with_await(req.files.profile);
		}
		await DB.save('users', request_data);
		const usersinfo = await super.userDetails(request_data.id);
		return {
			message: 'Profile updated successfully',
			data: usersinfo,
		};
	}

	async addImage({ body: { user_id }, files }) {
		if (files.image === undefined) {
			throw new ApiError('image field is required');
		}

		const allImages = [];
		if (Array.isArray(files.image)) {
			const totalFiles = files.image.length;
			for (let i = 0; i < totalFiles; i++) {
				const image = app.upload_pic_with_await(files.image[i]);
				const imageId = await DB.save('user_images', {
					user_id,
					image,
					position: i,
				});
				allImages.push({
					imageId,
					user_id,
					image,
					position: i,
				});
			}
		} else {
			const image = app.upload_pic_with_await(files.image);
			const imageId = await DB.save('user_images', {
				user_id,
				image,
				position: 1,
			});
			allImages.push({
				imageId,
				user_id,
				image,
				position: 1,
			});
		}

		return {
			message: 'Image added successfully',
			status: 201,
			data: app.addUrl(allImages, 'image'),
		};
	}

	async removeImage({ body: { user_id }, params: { imageId = 0 } }) {
		const checkID = await DB.find('user_images', 'first', {
			id: imageId,
			user_id,
		});
		if (!checkID) throw new ApiError('Invaild image information');
		await DB.first(
			`delete from user_images where id = ${imageId} and user_id=${user_id}`
		);
		return {
			message: 'Image Removed Successfully',
		};
	}

	async logout(Request) {
		const { user_id } = Request.body;
		await DB.save('users', {
			id: user_id,
			authorization_key: '',
			device_token: '',
		});
		return {
			message: 'User Logout successfully',
			data: [],
		};
	}
	async removeAccount(Request) {
		const { user_id } = Request.body;
		await DB.first(`delete from users where id = ${user_id}`);
		await DB.first(`delete from services where userId = ${user_id}`);
		return {
			message: 'User Logout successfully',
			data: [],
		};
	}
	async favMassager({ body: { user_id, massagerId } }) {
		const checkMessagerId = await DB.find('users', 'first', {
			conditions: {
				id: massagerId,
				userType: 1,
			},
		});
		if (!checkMessagerId) throw new ApiError('Invaild massagerId');
		const checkIsFav = await DB.find('favourite_services', 'first', {
			conditions: {
				userId: user_id,
				massagerId,
			},
		});
		let message = 'Massager Add in fav list';
		let status = 201;
		if (checkIsFav) {
			message = 'Massager remove from the fav list';
			await DB.first(
				`delete from favourite_services where id = ${checkIsFav.id}`
			);
			status = 200;
		} else {
			await DB.save('favourite_services', {
				userId: user_id,
				massagerId,
			});
		}
		return {
			message,
			status,
		};
	}

	async getFavMassagers({
		body: { user_id },
		query: { page = 1, limit = 20, search = '' },
	}) {
		const offset = (page - 1) * limit;
		const condition = {
			conditions: {
				'favourite_services.userId': user_id,
				'users.status': 1,
			},
			join: ['users on (favourite_services.massagerId= users.id)'],
			fields: [
				'users.id',
				'users.name',
				'users.email',
				'users.phone',
				'users.longitude',
				'users.latitude',
				'users.location',
				'users.profile',
				'1 as isFav',
				`(select IFNULL(round(avg(rating),1),0) as rating from ratings where massagerId=users.id) as totalRating`,
			],
			limit: [offset, limit],
			order: ['favourite_services.id desc'],
		};
		if (search) {
			Object.assign(condition.conditions, {
				like: {
					'users.name': search,
				},
			});
		}
		const allMassager = await DB.find('favourite_services', 'all', condition);
		return {
			message: 'my fav massager list',
			data: {
				pagination: await super.Paginations(
					'favourite_services',
					condition,
					page,
					limit
				),
				result: app.addUrl(allMassager, 'profile'),
			},
		};
	}

	async getMassagerAccordingtoLocation({
		body: { user_id },
		query: {
			latitude,
			longitude,
			distance = 100,
			search = '',
			page = 1,
			limit = 20,
			serviceId = 0,
		},
	}) {
		const offset = (page - 1) * limit;
		const condition = {
			conditions: {
				'users.status': 1,
				userType: 1,
				raw: [
					`round(( 6371 * acos( cos( radians(${latitude}) ) * cos( radians(latitude) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin(radians(latitude)) ) ),0) < ${distance}`,
				],
			},
			fields: [
				'users.id',
				'users.name',
				'users.email',
				'users.phone',
				'users.longitude',
				'users.latitude',
				'users.location',
				'users.profile',
				'users.workingExperience',
				'users.working_hours',
				`(select count(*) from favourite_services where userId=${user_id} and massagerId=users.id) as isFav`,
				`(select IFNULL(round(avg(rating),1),0) as rating from ratings where massagerId=users.id) as totalRating`,
				`(select count(*) as totalReview from ratings where massagerId=users.id) as totalReview`,
				`round(( 6371 * acos( cos( radians(${latitude}) ) * cos( radians(latitude) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin(radians(latitude)) ) ),0) as totalDistance`,
			],
			limit: [offset, limit],
			order: ['totalDistance asc'],
		};
		if (parseInt(serviceId) !== 0) {
			Object.assign(condition, {
				join: [`services on (users.id = services.userId)`],
			});
			Object.assign(condition.conditions, {
				'services.id': serviceId,
			});
		}
		if (search) {
			Object.assign(condition.conditions, {
				like: {
					'users.name': search,
				},
			});
		}
		const allMassager = await DB.find('users', 'all', condition);
		return {
			message: 'Near me massager',
			data: {
				pagination: await super.Paginations('users', condition, page, limit),
				result: app.addUrl(allMassager, 'profile'),
			},
		};
	}
	async topRated({ body: { user_id = 0 }, query: { page = 1, limit = 20 } }) {
		const offset = (page - 1) * limit;
		const condition = {
			conditions: {
				status: 1,
				userType: 1,
			},
			fields: [
				'users.id',
				'users.name',
				'users.email',
				'users.phone',
				'users.longitude',
				'users.latitude',
				'users.location',
				'users.profile',
				'users.workingExperience',
				'users.working_hours',
				`(select count(*) from favourite_services where userId=${user_id} and massagerId=users.id) as isFav`,
				`(select IFNULL(round(avg(rating),1),0) as rating from ratings where massagerId=users.id) as totalRating`,
				`(select count(*) as totalReview from ratings where massagerId=users.id) as totalReview`,
			],
			limit: [offset, limit],
			orderBy: ['totalReview desc, totalRating desc '],
		};
		const allMassager = await DB.find('users', 'all', condition);
		return {
			message: 'Top rated',
			data: {
				pagination: await super.Paginations('users', condition, page, limit),
				result: app.addUrl(allMassager, 'profile'),
			},
		};
	}
	async getRating({
		params: { massagerId },
		query: { page = 1, limit = 20 },
		body: {
			userInfo: { userType, id },
		},
	}) {
		const offset = (page - 1) * limit;
		let conditions = {
			massagerId,
			//'ratings.userType': userType,
		};
		// if (userType === 0) {
		// 	conditions = {
		// 		massagerId,
		// 		'ratings.userType': userType,
		// 	};
		// }
		// if (id === parseInt(massagerId)) {
		// 	if (userType === 1) {
		// 		conditions = {
		// 			massagerId,
		// 			'ratings.userType': userType,
		// 		};
		// 	} else {
		// 		conditions = {
		// 			userId: massagerId,
		// 			'ratings.userType': userType,
		// 		};
		// 	}
		// }
		const condition = {
			conditions,
			join: ['users on (users.id=ratings.userId)'],
			fields: [
				'users.id as userId',
				'users.name',
				'users.email',
				'users.phone',
				'users.longitude',
				'users.latitude',
				'users.location',
				'users.profile',
				'ratings.rating',
				'ratings.comment',
				'ratings.bookingId',
				'ratings.created',
			],
			limit: [offset, limit],
			order: ['ratings.id desc'],
		};
		const allMassager = await DB.find('ratings', 'all', condition);
		return {
			message: 'Rating list',
			data: {
				pagination: await super.Paginations('ratings', condition, page, limit),
				result: app.addUrl(allMassager, 'profile'),
			},
		};
	}

	async giveRating({
		body: {
			user_id,
			massagerId,
			rating,
			comment = 'no comment',
			bookingId,
			userInfo: { userType },
		},
	}) {
		const requestData = await super.vaildation({
			userId: userType === 0 ? user_id : massagerId,
			massagerId: userType === 1 ? user_id : massagerId,
			rating,
			comment,
			bookingId,
			userType,
		});
		if (parseInt(rating) > 5)
			throw new ApiError('Rating should be less or equal then 5');
		requestData.id = await DB.save('ratings', requestData);
		return {
			message: 'Rating successfully',
			status: 201,
			data: requestData,
		};
	}

	async getImages({ query: { page = 1, limit = 20 }, body: { user_id } }) {
		const offset = (page - 1) * limit;
		const condition = {
			conditions: {
				user_id,
			},
			limit: [offset, limit],
			orderBy: ['id desc'],
		};
		const allImages = await DB.find('user_images', 'all', condition);
		return {
			message: 'Provider Images',
			data: {
				pagination: await super.Paginations(
					'user_images',
					condition,
					page,
					limit
				),
				result: app.addUrl(allImages, 'image'),
			},
		};
	}
	mails({ email, phone, name, authorization_key, otp }) {
		const mail = {
			to: email,
			subject: 'User Account Verification',
			template: 'user_signup',
			data: {
				first_name: name,
				last_name: name,
				url: global.appURL + 'users/verify/' + authorization_key,
			},
		};
		try {
			app.sendSMS({
				to: phone,
				message: `Hi ${name}, Your one time password for phone verification is ${otp}`,
			});
			app.send_mail(mail);
			return true;
		} catch (error) {}
	}
}

module.exports = UserController;
