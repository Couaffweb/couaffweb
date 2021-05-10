const crypto = require('crypto');
const Db = require('../../../libary/sqlBulider');
const ApiError = require('../../Exceptions/ApiError');
const { lang } = require('../../../config');
const App = require('../../../libary/CommanMethod');
const DB = new Db();

class ApiController {
	async vaildation(required, non_required = {}) {
		try {
			let message = '';
			let empty = [];
			let table_name = required.hasOwnProperty('table_name')
				? required.table_name
				: 'users';
			for (let key in required) {
				if (required.hasOwnProperty(key)) {
					if (required[key] === undefined || required[key] === '') {
						empty.push(key);
					}
				}
			}
			if (empty.length !== 0) {
				message = empty.toString();
				if (empty.length > 1) {
					message += ' ' + lang['en'].fieldsRequired;
				} else {
					message += ' ' + lang['en'].fieldsRequired;
				}
				throw new ApiError(message, 400);
			}

			if (required.hasOwnProperty('checkexist') && required.checkexist === 1) {
				if (required.hasOwnProperty('email')) {
					if (
						await this.checkingAvailability('email', required.email, table_name)
					) {
						throw new ApiError(lang['en'].emailRegister);
					}
				}
				if (required.hasOwnProperty('phone')) {
					if (
						await this.checkingAvailability('phone', required.phone, table_name)
					) {
						throw new ApiError(lang['en'].emailRegister);
					}
				}
				if (required.hasOwnProperty('username')) {
					if (
						await this.checkingAvailability(
							'username',
							required.username,
							table_name
						)
					) {
						throw new ApiError('username already exits');
					}
				}
			}

			let final_data = Object.assign(required, non_required);

			if (final_data.hasOwnProperty('password')) {
				final_data.password = crypto
					.createHash('sha1')
					.update(final_data.password)
					.digest('hex');
			}

			if (final_data.hasOwnProperty('old_password')) {
				final_data.old_password = crypto
					.createHash('sha1')
					.update(final_data.old_password)
					.digest('hex');
			}
			if (final_data.hasOwnProperty('new_password')) {
				final_data.new_password = crypto
					.createHash('sha1')
					.update(final_data.new_password)
					.digest('hex');
			}

			for (let data in final_data) {
				if (final_data[data] === undefined) {
					delete final_data[data];
				} else {
					if (typeof final_data[data] == 'string') {
						final_data[data] = final_data[data].trim();
					}
				}
			}
			return final_data;
		} catch (err) {
			throw err;
		}
	}

	async checkingAvailability(key, value, table_name) {
		let query =
			'select * from ' +
			table_name +
			' where `' +
			key +
			"` = '" +
			value +
			"' limit 1";
		let data = await DB.first(query);
		if (data.length) {
			return true;
		} else {
			return false;
		}
	}
	async QueryPaginations(table, page, limit) {
		const totalRecord = await DB.first(table);
		const totalPage = Math.round(totalRecord[0].total / limit, 0) || 1;
		return {
			currentPage: page + 1,
			totalPage,
			totalRecord: totalRecord[0].total,
			limit: parseInt(limit),
		};
	}
	async Paginations(table, condition, page, limit) {
		delete condition.limit;
		delete condition.orderBy;
		const totalRecord = await DB.find(table, 'count', condition);
		const totalResult = totalRecord.length > 0 ? totalRecord[0].totalRecord : 0;
		let totalPage = Math.round(totalResult / limit, 0);
		console.log(totalPage, 'totalPage');
		if (totalPage === 0) {
			totalPage = 1;
		}
		return {
			currentPage: page + 1,
			totalPage,
			totalRecord: totalResult,
			limit: parseInt(limit),
		};
	}

	async sendPush(pushObject, id) {
		const User = await DB.find('users', 'first', {
			conditions: {
				id,
			},
		});
		if (User.device_token) {
			pushObject['token'] = User.device_token;
			pushObject['device_type'] = User.device_type;
			App.send_push(pushObject);
		}
	}

	async userDetails(id, noKey = false) {
		const result = await DB.find('users', 'first', {
			conditions: {
				id: id,
			},
			fields: [
				'id',
				'name',
				'status',
				'email',
				'phone',
				'longitude',
				'latitude',
				'location',
				'profile',
				'authorization_key',
				'userType',
				'workingExperience',
				'working_hours',
				'about_us',
				`(select IFNULL(round(avg(rating),1),0) as rating from ratings where massagerId=users.id) as totalRating`,
				`(select count(*) as totalReview from ratings where massagerId=users.id) as totalReview`,
				`(select count(*) as totalReview from ratings where rating=1 and massagerId=users.id) as rating1`,
				`(select count(*) as totalReview from ratings where rating=2 and massagerId=users.id) as rating2`,
				`(select count(*) as totalReview from ratings where rating=3 and massagerId=users.id) as rating3`,
				`(select count(*) as totalReview from ratings where rating=4 and massagerId=users.id) as rating4`,
				`(select count(*) as totalReview from ratings where rating=5 and massagerId=users.id) as rating5`,
			],
		});
		if (result.profile) {
			result.profile = global.appURL + 'uploads/' + result.profile;
		}
		if (result.working_hours) {
			result.working_hours = JSON.parse(result.working_hours);
		}
		if (noKey) {
			delete result.authorization_key;
		}
		result.sevicesIds = '';
		result.userImages = [];
		const allServices = await DB.first(
			`select GROUP_CONCAT(id) as total from user_services where userId=${result.id}`
		);
		const images = await DB.find('user_images', 'all', {
			conditions: {
				user_id: result.id,
			},
		});
		if (allServices.length > 0) {
			result.sevicesIds = allServices[0].total;
		}
		if (images.length > 0) {
			result.userImages = App.addUrl(images, 'image');
		}
		return result;
	}
}

module.exports = ApiController;
